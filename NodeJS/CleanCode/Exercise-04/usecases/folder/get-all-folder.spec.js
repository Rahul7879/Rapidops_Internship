const { expect } = require('chai');
const { Given, When, Then, Before, BeforeAll, After, AfterAll } = require('@cucumber/cucumber');
const sinon = require('sinon');
const sandBox = sinon.createSandbox();
const makeGetAllAssignedFolders = require('./get-all-folder');

const FolderDBCalls = {
  getAllFolders: () => {},
  getAssignedFolders: () => {}
};

let getAllAssignedFolders;

BeforeAll(() => {
  sandBox.stub(FolderDBCalls, 'getAllFolders').resolves([{ folderId: 1, name: 'Folder1' }, { folderId: 2, name: 'Folder2' }]);
  sandBox.stub(FolderDBCalls, 'getAssignedFolders').resolves([{ id: 'assignedFolder1', name: 'Assigned Folder 1' }]);
});

Before(() => {
  getAllAssignedFolders = makeGetAllAssignedFolders(FolderDBCalls);
});

After(() => {
  sandBox.reset();
  this.result= undefined
  this.error= undefined
  this.user= undefined
});

AfterAll(() => {
  sandBox.restore(); 
});

Given('user: {string} get all assigned folders usecase', function (user) {
  this.user = JSON.parse(user);
});

When('try to get all assigned folders', async function () {
  try {
    this.result = await getAllAssignedFolders(this.user);

  } catch (error) {
    this.error = error;
  }
});

Then('It should return the result: {string} after fetching all folder', function (result) {
  expect(JSON.stringify(this.result)).to.equal(result);
});

Then('It should return the error: {string} for fetching all folder', function (error) {
  expect(this.error.msg).to.equal(error.split(':')[1].trim());
  expect(this.error.status).to.equal(parseInt(error.split(':')[0].trim(), 10));
});

