const { expect } = require('chai');
const { Given, When, Then, BeforeAll, Before, AfterAll } = require('@cucumber/cucumber');
const sinon = require('sinon');
const sandBox = sinon.createSandbox();
const makeCreateRole = require('./create-role');

const RoleDBCalls = {
  getTenantIdByEmail: () => {},
  checkRoleExists: () => {},
  createRole: () => {}
};

let getTenantIdByEmailStub;
let checkRoleExistsStub;
let createRoleStub;

BeforeAll(() => {
  getTenantIdByEmailStub = sandBox.stub(RoleDBCalls, 'getTenantIdByEmail');
  checkRoleExistsStub = sandBox.stub(RoleDBCalls, 'checkRoleExists');
  createRoleStub = sandBox.stub(RoleDBCalls, 'createRole');
});

AfterAll(() => {
  sandBox.restore();
});

Given('roleName: {string}, isReadable: {string}, isDeletable: {string}, isWritable: {string}, isEditable: {string} role creation usecase', function (roleName, isReadable, isDeletable, isWritable, isEditable) {
  this.roleName = roleName;
  this.isReadable = isReadable ? Boolean(isReadable) : undefined;
  this.isDeletable =isDeletable ? Boolean(isDeletable) : undefined;
  this.isWritable = isWritable ? Boolean(isWritable) : undefined;
  this.isEditable = isEditable ? Boolean(isEditable) : undefined;
});

Given('user email: {string}', function (userEmail) {
  this.userEmail = userEmail;
});

When('try to create role', async function () {
  const createRoleUseCase = makeCreateRole(RoleDBCalls);
  const data = { 
    roleName: this.roleName, 
    isReadable: this.isReadable, 
    isDeletable: this.isDeletable, 
    isWritable: this.isWritable, 
    isEditable: this.isEditable 
  };
  const user = { email: this.userEmail };
  try {
    // console.log(data,"_______________kk")
    await createRoleUseCase(data, user);
    this.result = 'Role created successfully';
  } catch (error) {
    // console.log(error,"Error")
    this.error = error;
  }
});

Then('It should return a success message: {string} after role creation', function (message) {
  expect(this.result).to.equal(message);
});

Then('It should return the error: {string} for role creation', function (error) {
  expect(this.error.msg).to.equal(error.split(': ')[1].trim());
});

Before(() => {
  getTenantIdByEmailStub.callsFake((email) => {
    if (email === 'noTenant@example.com') {
      return null;
    }
    return 'tenantId';
  });

  checkRoleExistsStub.callsFake((tenantId, roleName) => {

    if (roleName === 'duplicateRole' && tenantId === 'tenantId') {
      return true;
    }
    return false;
  });

  createRoleStub.callsFake((tenantId, permissions, roleName) => {
    expect(tenantId).to.equal('tenantId');
    expect(roleName).to.be.oneOf(['Admin', 'Editor']);
  });
});
