const { Given, When, Then, After } = require('@cucumber/cucumber');
const { expect } = require('chai');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const makeLoginUser = require('./log-in-tenant');
const { userDBCalls } = require('../../data-access');

const SECRET_KEY = 'your_secret_key';

const sandbox = sinon.createSandbox();

let params;
let userDetails;
let response;
let error;

Given('a user with email {string} and userId {string}', function (email, userId) {
    userDetails = { email, userId };
});

Given('a tenant with id {string}', function (tenantId) {
    params = { tenantId };
});

When('the user attempts to login to the tenant', async function () {
    const loginUserInTenant = makeLoginUser(userDBCalls, jwt, SECRET_KEY);

    // Mocking userDBCalls.checkUserAccess
    if (params.tenantId === 'tenant2') {
        sandbox.stub(userDBCalls, 'checkUserAccess').resolves(null);
    } else {
        sandbox.stub(userDBCalls, 'checkUserAccess').resolves({ permissions: 'read', isAdmin: false, roleId: 'role1', isTempUser: false });
    }

    try {
        response = await loginUserInTenant(params, userDetails);
    } catch (err) {
        error = err;
    }
});

Then('the tenant login should be successful with a token', function () {
    expect(response).to.have.property('token');
    expect(response).to.have.property('tenantId', params.tenantId);
});

Then('the tenant login should fail with a {int} error and message {string}', function (status, message) {
    expect(error).to.have.property('status', status);
    expect(error).to.have.property('msg', message);
});

After(() => {
    sandbox.restore();
});
