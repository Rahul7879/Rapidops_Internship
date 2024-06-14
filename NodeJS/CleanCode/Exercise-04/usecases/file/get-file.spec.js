const { expect } = require('chai');
const { Given, When, Then, Before, BeforeAll, After, AfterAll } = require('@cucumber/cucumber');
const sinon = require('sinon');
const sandBox = sinon.createSandbox();
const makeGetFile = require('./get-file');

const FileDBCalls = {
  getFileDetails: () => {},
  checkFileAccess: () => {},
  checkFileExists: () => {}
};

let getFileDetailsStub;
let checkFileAccessStub;
let checkFileExistsStub;
let getFile;

BeforeAll(() => {
  getFile = makeGetFile(FileDBCalls);
});

Before(() => {
  getFileDetailsStub = sandBox.stub(FileDBCalls, 'getFileDetails');
  checkFileAccessStub = sandBox.stub(FileDBCalls, 'checkFileAccess');
  checkFileExistsStub = sandBox.stub(FileDBCalls, 'checkFileExists');

  getFileDetailsStub.withArgs('1').returns({ file_path: 'path/to/file' });
  getFileDetailsStub.withArgs('2').returns({ file_path: 'path/to/file2' });

  checkFileAccessStub.callsFake((fileId, roleId, tenantId) => {
    return (fileId === '1' && roleId === 'role1' && tenantId === 'tenant1') ||
           (fileId === '2' && roleId === 'role2' && tenantId === 'tenant2');
  });

  checkFileExistsStub.callsFake((filePath) => {
    return filePath === 'path/to/file' || filePath === 'path/to/file2';
  });
});

After(() => {
  sandBox.restore(); 
});



Given('fileId: {string}, user: {string} get file usecase', function (fileId, user) {
  this.fileId = fileId;
  this.user = JSON.parse(user);
});

When('try to get file', async function () {
  try {
    this.result = await getFile(this.fileId, this.user);
  } catch (error) {
    this.error = error;
  }
});

Then('It should return the result: {string} after getting file', function (result) {
  expect(this.result).to.deep.equal(JSON.parse(result));
});

Then('It should return the error: {string} for getting file', function (error) {
  const parsedError = JSON.parse(error);
  expect(this.error.msg).to.equal(parsedError.msg);
  expect(this.error.status).to.equal(parsedError.status);
});
