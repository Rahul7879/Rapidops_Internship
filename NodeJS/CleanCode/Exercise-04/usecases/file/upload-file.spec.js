const { expect } = require('chai');
const { Given, When, Then, Before, BeforeAll, After, AfterAll } = require('@cucumber/cucumber');
const sinon = require('sinon');
const sandBox = sinon.createSandbox();
const makeUploadFile = require('./upload-file');


let deleteFileFromFileSystemStub;
let renameFileStub;
let insertFileStub;

const FileDBCalls = {
  deleteFileFromFileSystem: () => {},
  renameFile: () => {},
  insertFile: () => {}
};

BeforeAll(() => {
  deleteFileFromFileSystemStub = sandBox.stub(FileDBCalls, 'deleteFileFromFileSystem');
  renameFileStub = sandBox.stub(FileDBCalls, 'renameFile');
  insertFileStub = sandBox.stub(FileDBCalls, 'insertFile');
});

Before(() => {
  deleteFileFromFileSystemStub.reset();
  renameFileStub.reset();
  insertFileStub.reset();
});

AfterAll(() => {
  sandBox.restore();
});

Given('files: {string}, body: {string}, user: {string} upload file usecase', function (files, body, user) {
  this.files = JSON.parse(files);
  this.body = JSON.parse(body);
  this.user = JSON.parse(user);
});

When('try to upload the files', async function () {
  const uploadFile = makeUploadFile(FileDBCalls, require('path'));
  try {
    await uploadFile(this.files, this.body, this.user);
    this.result = 'success';
  } catch (error) {
    this.error = error;
  }
});

Then('It should return the result: {string} after uploading', function (result) {
  expect(this.result).to.equal(result);
});

Then('It should return the error: {string} for uploading', function (error) {
  expect(this.error.msg).to.equal(error.split(':')[1].trim());
  expect(this.error.status).to.equal(parseInt(error.split(':')[0].trim(), 10));
});
