const { expect } = require('chai');
const { Given, When, Then, Before, BeforeAll, After, AfterAll } = require('@cucumber/cucumber');
const sinon = require('sinon');
const sandBox = sinon.createSandbox();
const makeDeleteFolder = require('./delete-folder');


let checkFolderAccessStub;
let deleteFolderStub;

const FolderDBCalls = {
  checkFolderAccess: () => {},
  deleteFolder: () => {}
};

BeforeAll(() => {
  checkFolderAccessStub = sandBox.stub(FolderDBCalls, 'checkFolderAccess');
  deleteFolderStub = sandBox.stub(FolderDBCalls, 'deleteFolder');
});

Before(() => {
  checkFolderAccessStub.reset();
  deleteFolderStub.reset();
});

After(() => {
  sandBox.restore();
  this.result= undefined
  this.error= undefined
  this.user= undefined
  this.folderId = undefined;
});

AfterAll(() => {
  sandBox.restore();
});

Given('folderId: {string}, user: {string} delete folder usecase', function (folderId, user) {
  this.folderId = folderId;
  this.user = JSON.parse(user);
});

When('try to delete the folder', async function () {
  const deleteFolder = makeDeleteFolder(FolderDBCalls);
  try {
    await deleteFolder(this.folderId, this.user);
    this.result = 'success';
  } catch (error) {
    this.error = error;
  }
});

Then('It should return the result: {string} after deleting', function (result) {
  expect(this.result).to.equal(result);
});

Then('It should return the error: {string} for deleting', function (error) {
  expect(this.error.msg).to.equal(error.split(':')[1].trim());
  expect(this.error.status).to.equal(parseInt(error.split(':')[0].trim(), 10));
});
