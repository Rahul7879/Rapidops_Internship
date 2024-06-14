const { expect } = require('chai');
const { Given, When, Then, Before, BeforeAll, After, AfterAll } = require('@cucumber/cucumber');
const sinon = require('sinon');
const sandBox = sinon.createSandbox();
const makeGetFile = require('./move-file');


let checkFileAccessStub;
let updateFileFolderStub;

const FileDBCalls = {
  checkFileAccess: () => {},
  updateFileFolder: () => {}
};

BeforeAll(() => {
  checkFileAccessStub = sandBox.stub(FileDBCalls, 'checkFileAccess');
  updateFileFolderStub = sandBox.stub(FileDBCalls, 'updateFileFolder');
});

Before(() => {
  checkFileAccessStub.reset();
  updateFileFolderStub.reset();
});

AfterAll(() => {
  sandBox.restore();
});

Given('fileId: {string}, newFolderId: {string}, user: {string} move file usecase', function (fileId, newFolderId, user) {
  this.fileId = fileId;
  this.newFolderId = newFolderId;
  this.user = JSON.parse(user);
});

When('try to move the file', async function () {
  const moveFile = makeGetFile(FileDBCalls);
  try {
    await moveFile(this.fileId, this.newFolderId, this.user);
    this.result = 'success';
  } catch (error) {
    this.error = error;
  }
});

Then('It should return the result: {string} after moving', function (result) {
  expect(this.result).to.equal(result);
});

Then('It should return the error: {string} for moving', function (error) {
  expect(this.error.msg).to.equal(error.split(':')[1].trim());
  expect(this.error.status).to.equal(parseInt(error.split(':')[0].trim(), 10));
});
