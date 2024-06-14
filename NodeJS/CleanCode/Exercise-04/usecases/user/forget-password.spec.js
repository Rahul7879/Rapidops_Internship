const { Given, When, Then, After } = require('@cucumber/cucumber');
const { expect } = require('chai');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const makeForgotPassword = require('./forget-password');
const { userDBCalls } = require('../../data-access');
const mailer = require('../../utilities/mailer');
const SECRET_KEY = 'your_secret_key';
const sandbox = sinon.createSandbox();

let userDetails;
let response;
let error;

Given('a user with email {string}', function (email) {
    userDetails = { email };
});

When('the user requests to reset the password', async function () {
    const forgotPassword = makeForgotPassword(userDBCalls, jwt, SECRET_KEY, mailer);

    if (userDetails.email === 'nonexistent@example.com') {
        sandbox.stub(userDBCalls, 'findUserByEmail').resolves(null);
    } else {
        sandbox.stub(userDBCalls, 'findUserByEmail').resolves({ email: userDetails.email });
    }

    if (userDetails.email === 'nonexistent@example.com') {
        sandbox.stub(mailer, 'sendMail').rejects(new Error('Error sending email'));
    } else {
        sandbox.stub(mailer, 'sendMail').resolves();
    }

    try {
        response = await forgotPassword(userDetails);
    } catch (err) {
        error = err;
    }
});

Then('a password reset link should be sent to the user\'s email', function () {
    expect(response).to.not.be.undefined;
    expect(response).to.have.property('status', 200);
    expect(response).to.have.property('msg', 'Password reset link sent to email');
});

Then('the password reset link request should fail with a {int} error and message {string}', function (status, message) {
    expect(error).to.not.be.undefined;
    expect(error).to.have.property('status', status);
    expect(error).to.have.property('msg', message);
});

After(() => {
    sandbox.restore();
});
