const { Given, When, Then, After } = require('@cucumber/cucumber');
const { expect } = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const makeResetPassword = require('./reset-password');
const { userDBCalls } = require('../../data-access'); // Adjust path as necessary

const SECRET_KEY = 'your_secret_key';
const sandbox = sinon.createSandbox();

let token;
let newPassword;
let response;
let error;

Given('a user with email {string} and token {string}', function (email, tokenValue) {
    token = tokenValue;
    this.userDetails = { email };
});

When('the user resets the password to {string}', async function (newPasswordValue) {
    newPassword = newPasswordValue;
    const resetPassword = makeResetPassword(userDBCalls, bcrypt, jwt, SECRET_KEY);

    sandbox.stub(userDBCalls, 'updateUserPassword').resolves();

    if (token.includes('invalid') || token.includes('expired')) {
        sandbox.stub(jwt, 'verify').throws(new Error('Invalid token'));
    } else {
        sandbox.stub(jwt, 'verify').returns({ email: this.userDetails.email });
    }

    try {
        response = await resetPassword(token, newPassword);
    } catch (err) {
        error = err;
    }
});

Then('the password reset should be successful', function () {
    expect(response).to.not.be.undefined;
    expect(response).to.have.property('status', 200);
    expect(response).to.have.property('msg', 'Password reset successful');
});

Then('the reset password response should have a status of 200 and message {string}', function (message) {
    expect(response).to.have.property('status', 200);
    expect(response).to.have.property('msg', message);
});

Then('the password reset should fail with a {int} error and message {string}', function (status, message) {
    expect(error).to.not.be.undefined;
    expect(error).to.have.property('status', status);
    expect(error).to.have.property('msg', message);
});

After(() => {
    sandbox.restore();
});
