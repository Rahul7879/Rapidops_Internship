const { expect } = require('chai');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const sinon = require('sinon');
const makeCreateTenant = require('./create-tenant');

const tenantDBCalls = {
  fetchUserIdByEmail: () => { },
  checkExistingOrganization: () => { },
  createOrganization: () => { },
  setTenantForUser: () => { },
  createAdminRole: () => { }
};

let fetchUserIdByEmailStub;
let checkExistingOrganizationStub;
let createOrganizationStub;
let setTenantForUserStub;
let createAdminRoleStub;
let orgName; 

Before(() => {
  fetchUserIdByEmailStub = sinon.stub(tenantDBCalls, 'fetchUserIdByEmail');
  checkExistingOrganizationStub = sinon.stub(tenantDBCalls, 'checkExistingOrganization');
  createOrganizationStub = sinon.stub(tenantDBCalls, 'createOrganization');
  setTenantForUserStub = sinon.stub(tenantDBCalls, 'setTenantForUser');
  createAdminRoleStub = sinon.stub(tenantDBCalls, 'createAdminRole');

  fetchUserIdByEmailStub.callsFake(async (email) => {
    if (email === 'user@example.com') {
      return 'userId-123';
    }
    throw { msg: 'User not found', status: 404 };
  });

  checkExistingOrganizationStub.callsFake(async (userId) => {
    console.log(userId, orgName);
    if (orgName === 'Existing Org' && userId === 'userId-123') {
      return true;
    }
    return false;
  });

  createOrganizationStub.callsFake(async (userId, orgName) => 'org1');

  setTenantForUserStub.callsFake(async (userId, orgId) => { });

  createAdminRoleStub.callsFake(async (userId, orgId) => { });
});

After(() => {
  sinon.restore();
});

Given('email: {string}, orgName: {string} for create tenant usecase', function (email, orgNameParam) {
  this.email = email;
  orgName = orgNameParam; 
  console.log(orgName, "orgName");
});

When('try to create tenant', async function () {
  const createTenant = makeCreateTenant(tenantDBCalls);
  try {
    this.result = await createTenant(this.email, orgName);
  } catch (error) {
    this.error = error;
  }
});

Then('It should return the organization ID: {string} after creating tenant', function (orgId) {
  expect(this.result).to.equal(orgId);
});

Then('It should return the error: {string} for creating tenant', function (error) {
  const [errorMsg, errorCode] = error.split(' (');
  const statusCode = parseInt(errorCode.replace(')', ''), 10);
  expect(this.error.msg).to.equal(errorMsg);
  expect(this.error.status).to.equal(statusCode);
});

