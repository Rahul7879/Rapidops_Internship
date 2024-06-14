const { expect } = require('chai');
const { Given, When, Then, Before, BeforeAll, After, AfterAll } = require('@cucumber/cucumber');
const sinon = require('sinon');
const sandBox = sinon.createSandbox();
const makeMoveFolder = require('./move-folder');

let checkFolderAccessStub;
let updateFolderParentStub;

const FolderDBCalls = {
  checkFolderAccess: () => {},
  updateFolderParent: () => {}
};

BeforeAll(() => {
  checkFolderAccessStub = sandBox.stub(FolderDBCalls, 'checkFolderAccess');
  updateFolderParentStub = sandBox.stub(FolderDBCalls, 'updateFolderParent');
});

Before(() => {
  checkFolderAccessStub.reset();
  updateFolderParentStub.reset();
});

AfterAll(() => {
  sandBox.restore();
});

Given('folderId: {string}, newParentFolder: {string}, user: {string} move folder usecase', function (folderId, newParentFolder, user) {
  this.folderId = folderId;
  this.newParentFolder = newParentFolder;
  this.user = JSON.parse(user);
});

When('try to move the folder', async function () {
  const moveFolder = makeMoveFolder(FolderDBCalls);
  try {
    await moveFolder(this.folderId, this.newParentFolder, this.user);
    this.result = 'success';
  } catch (error) {
    this.error = error;
  }
});

Then('It should return the result: {string} after moving folder', function (result) {
  expect(this.result).to.equal(result);
});

Then('It should return the error: {string} for moving folder', function (error) {
  expect(this.error.msg).to.equal(error.split(':')[1].trim());
  expect(this.error.status).to.equal(parseInt(error.split(':')[0].trim(), 10));
});

