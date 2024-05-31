const { Given, When, Then, After } = require('@cucumber/cucumber');
const { expect } = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const makeSignUpUser = require('./signup');
const { userDBCalls } = require('../../data-access');
const { User } = require('../../entities');

const SECRET_KEY = 'your_secret_key';

const sandbox = sinon.createSandbox();

let userDetails;
let response;
let error;

Given('a user with email {string} and password {string} and full name {string}', function (email, password, fullName) {
    userDetails = { email, password, fullName };
});

When('the user attempts to sign up', async function () {
    const signupUser = makeSignUpUser(userDBCalls, bcrypt, jwt, SECRET_KEY);

    // Mocking userDBCalls.createUser
    if (userDetails.email === 'existing@example.com') {
        sandbox.stub(userDBCalls, 'createUser').throws({ code: 'ER_DUP_ENTRY' });
    } else if (userDetails.email === 'error@example.com' || userDetails.email === 'invalid@example.com') {
        sandbox.stub(userDBCalls, 'createUser').throws(new Error('Database error'));
    } else {
        sandbox.stub(userDBCalls, 'createUser').resolves();
    }

    try {
        response = await signupUser(userDetails);
    } catch (err) {
        error = err;
    }
});

Then('the signup should be successful with a token', function () {
    expect(response).to.have.property('status', 201);
    expect(response).to.have.property('msg', 'SignUp successful');
    expect(response).to.have.property('token');
});

Then('the signup should fail with a {int} error and message {string}', function (status, message) {
    console.log("Received status:", status);
    console.log("Received message:", message);
    expect(error).to.have.property('status', status);
    expect(error).to.have.property('msg', message);
});

After(() => {
    sandbox.restore();
});
