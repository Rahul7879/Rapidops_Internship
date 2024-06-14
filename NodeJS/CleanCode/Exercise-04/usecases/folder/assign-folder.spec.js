const { expect } = require('chai');
const { Given, When, Then, Before, BeforeAll, After, AfterAll } = require('@cucumber/cucumber');
const sinon = require('sinon');
const sandBox = sinon.createSandbox();
const makeAssignFoldersToRole = require('./assign-folder');

let assignFoldersToRoleStub;

const FolderDBCalls = {
  assignFoldersToRole: () => {}
};

BeforeAll(() => {
  assignFoldersToRoleStub = sandBox.stub(FolderDBCalls, 'assignFoldersToRole');
});

Before(() => {
  assignFoldersToRoleStub.reset();
});

AfterAll(() => {
  sandBox.restore();
});

Given('folders: {string}, roleId: {string}, user: {string} assign folders to role usecase', function (folders, roleId, user) {
  this.folders = JSON.parse(folders);
  this.roleId = roleId;
  this.user = JSON.parse(user);
});

When('try to assign folders to role', async function () {
  const assignFoldersToRole = makeAssignFoldersToRole(FolderDBCalls);
  try {
    await assignFoldersToRole(this.folders, this.roleId, this.user);
    this.result = 'success';
  } catch (error) {
    this.error = error;
  }
});

Then('It should return the result: {string} after assigning', function (result) {
  expect(this.result).to.equal(result);
});

Then('It should return the error: {string} for assigning', function (error) {
  expect(this.error.msg).to.equal(error.split(':')[1].trim());
  expect(this.error.status).to.equal(parseInt(error.split(':')[0].trim(), 10));
});
