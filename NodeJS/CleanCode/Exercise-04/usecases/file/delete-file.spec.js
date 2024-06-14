const { expect } = require('chai');
const { Given, When, Then, Before, BeforeAll, After, AfterAll } = require('@cucumber/cucumber');
const sinon = require('sinon');
const sandBox = sinon.createSandbox();
const makeDeleteFile = require('./delete-file');

let checkFileAccessStub;
let deleteFileStub;

const FileDBCalls = {
  checkFileAccess: () => {},
  deleteFile: () => {}
};

BeforeAll(() => {
  checkFileAccessStub = sandBox.stub(FileDBCalls, 'checkFileAccess');
  deleteFileStub = sandBox.stub(FileDBCalls, 'deleteFile');
});

Before(() => {
  checkFileAccessStub.reset();
  deleteFileStub.reset();
});

AfterAll(() => {
  sandBox.restore();
});

Given('fileId: {string}, user: {string} delete file usecase', function (fileId, user) {
  this.fileId = fileId;
  this.user = JSON.parse(user);
});

When('try to delete the file', async function () {
  const deleteFile = makeDeleteFile(FileDBCalls);
  try {
    await deleteFile(this.fileId, this.user);
    this.result = 'success';
  } catch (error) {
    this.error = error;
  }
});

Then('It should return the result: {string} after deletion', function (result) {
  expect(this.result).to.equal(result);
});

Then('It should return the error: {string} for deletion', function (error) {
  expect(this.error.msg).to.equal(error.split(':')[1].trim());
  expect(this.error.status).to.equal(parseInt(error.split(':')[0].trim(), 10));
});
