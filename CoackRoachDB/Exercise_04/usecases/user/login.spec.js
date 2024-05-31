const { Given, When, Then, After } = require('@cucumber/cucumber');
const { expect } = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const makeLoginUser = require('./login');
const { userDBCalls } = require('../../data-access');
const { User } = require('../../entities');

const SECRET_KEY = 'your_secret_key';

const sandbox = sinon.createSandbox();

let userDetails;
let response;
let error;

Given('a user with email {string} and password {string}', function (email, password) {
    userDetails = { email, password };
});

When('the user attempts to login', async function () {
    const loginUser = makeLoginUser(userDBCalls, bcrypt, jwt, SECRET_KEY);

    if (userDetails.email === 'nonexisting@example.com') {
        sandbox.stub(userDBCalls, 'findUserByEmail').resolves(null);
    } else if (userDetails.email === 'user@example.com' && userDetails.password === 'wrongpass') {
        sandbox.stub(userDBCalls, 'findUserByEmail').resolves({ email: 'user@example.com', password: 'hashedpassword' });
        sandbox.stub(bcrypt, 'compare').resolves(false);
    } else if (userDetails.email === 'user@example.com' && userDetails.password === '') {
        sandbox.stub(userDBCalls, 'findUserByEmail').resolves({ email: 'user@example.com', password: null });
    } else {
        sandbox.stub(userDBCalls, 'findUserByEmail').resolves({ email: 'user@example.com', password: await bcrypt.hash('password123', 10) });
        sandbox.stub(bcrypt, 'compare').resolves(true);
    }

    try {
        response = await loginUser(userDetails);
    } catch (err) {
        error = err;
    }
});

Then('the login should be successful with a token', function () {
    expect(response).to.have.property('status', 200);
    expect(response).to.have.property('msg', 'Login successful');
    expect(response).to.have.property('token');
});

Then('the login should fail with a {int} error and message {string}', function (status, message) {
    console.log("Received status:", status);
    console.log("Received message:", message);
    expect(error).to.have.property('status', status);
    expect(error).to.have.property('msg', message);
});

After(() => {
    sandbox.restore();
});
