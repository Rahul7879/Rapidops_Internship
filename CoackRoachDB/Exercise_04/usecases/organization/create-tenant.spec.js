const { Given, When, Then, After } = require('@cucumber/cucumber');
const { expect } = require('chai');
const sinon = require('sinon');
const makeCreateTenant = require('./create-tenant');

const tenantDBCalls = {
  fetchUserIdByEmail: sinon.stub(),
  checkExistingOrganization: sinon.stub(),
  createOrganization: sinon.stub(),
  setTenantForUser: sinon.stub(),
  createAdminRole: sinon.stub()
};

const createTenant = makeCreateTenant(tenantDBCalls);

const sandbox = sinon.createSandbox();

let email;
let orgName;
let userId;
let newOrgId;
let response;
let error;

Given('a valid email {string} and organization name {string}', function (emailValue, orgNameValue) {
  email = emailValue;
  orgName = orgNameValue;
});

When('createTenant is called with the email and organization name', async function () {
  userId = 'userId123';
  newOrgId = 'newOrgId456';

  tenantDBCalls.fetchUserIdByEmail.withArgs(email).resolves(userId);
  tenantDBCalls.checkExistingOrganization.withArgs(userId).resolves(false);
  tenantDBCalls.createOrganization.withArgs(userId, orgName).resolves(newOrgId);
  tenantDBCalls.setTenantForUser.withArgs(userId, newOrgId).resolves();
  tenantDBCalls.createAdminRole.withArgs(userId, newOrgId).resolves();

  try {
    response = await createTenant(email, orgName);
  } catch (err) {
    error = err;
  }
});

Then('ensure fetchUserIdByEmail is called with the email', function () {
  expect(tenantDBCalls.fetchUserIdByEmail.calledWith(email)).to.be.true;
});

Then('ensure checkExistingOrganization is called with the fetched userId', function () {
  expect(tenantDBCalls.checkExistingOrganization.calledWith(userId)).to.be.true;
});

Then('ensure createOrganization is called with the fetched userId and organization name', function () {
  expect(tenantDBCalls.createOrganization.calledWith(userId, orgName)).to.be.true;
});

Then('ensure setTenantForUser is called with the fetched userId and new organization id', function () {
  expect(tenantDBCalls.setTenantForUser.calledWith(userId, newOrgId)).to.be.true;
});

Then('ensure createAdminRole is called with the fetched userId and new organization id', function () {
  expect(tenantDBCalls.createAdminRole.calledWith(userId, newOrgId)).to.be.true;
});

Then('the function returns the new organization id', function () {
  expect(response).to.equal(newOrgId);
});

Then('the function throws an error with message {string} and status {int}', function (msg, status) {
  expect(error).to.deep.equal({ msg, status });
});

After(() => {
  sandbox.restore();
});
