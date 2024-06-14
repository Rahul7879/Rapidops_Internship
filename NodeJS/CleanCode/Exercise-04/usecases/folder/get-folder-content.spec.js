const { expect } = require('chai');
const { Given, When, Then, Before, BeforeAll, After, AfterAll } = require('@cucumber/cucumber');
const sinon = require('sinon');
const sandBox = sinon.createSandbox();
const makeGetFolderContents = require('./get-folder-content');

const FolderDBCalls = {
    getFoldersByParentId: () => {},
    getFilesByFolderId: () => {},
    countFoldersByParentId: () => {},
    countFilesByFolderId: () => {},
    checkFolderAccess: () => {}
};

let getFoldersByParentIdStub;
let getFilesByFolderIdStub;
let countFoldersByParentIdStub;
let countFilesByFolderIdStub;
let checkFolderAccessStub;

BeforeAll(() => {
    getFoldersByParentIdStub = sandBox.stub(FolderDBCalls, 'getFoldersByParentId');
    getFilesByFolderIdStub = sandBox.stub(FolderDBCalls, 'getFilesByFolderId');
    countFoldersByParentIdStub = sandBox.stub(FolderDBCalls, 'countFoldersByParentId');
    countFilesByFolderIdStub = sandBox.stub(FolderDBCalls, 'countFilesByFolderId');
    checkFolderAccessStub = sandBox.stub(FolderDBCalls, 'checkFolderAccess');
});

Before(() => {
    getFoldersByParentIdStub.callsFake((folderId, limit, offset) => {
        if (folderId === '1') {
            return [{ id: 1 }];
        }
        return [];
    });

    getFilesByFolderIdStub.callsFake((folderId, limit, offset) => {
        if (folderId === '1') {
            return [{ id: 1 }];
        }
        return [];
    });

    countFoldersByParentIdStub.callsFake((folderId) => {
        if (folderId === '1') {
            return 1;
        }
        return 0;
    });

    countFilesByFolderIdStub.callsFake((folderId) => {
        if (folderId === '1') {
            return 1;
        }
        return 0;
    });

    checkFolderAccessStub.callsFake((folderId, roleId, tenantId) => {
        if (folderId === '1' && roleId === 'role1' && tenantId === 'tenant1') {
            return true;
        }
        return false;
    });
});

After(() => {
    sandBox.resetHistory();
});

AfterAll(() => {
    sandBox.restore();
});

Given('folderId: {string}, user: {string}, page: {string}, pageSize: {string}', function (folderId, user, page, pageSize) {
    this.folderId = folderId;
    this.user = JSON.parse(user);
    this.page = page;
    this.pageSize = pageSize;
});

When('try to get folder contents', async function () {
    const getFolderContents = makeGetFolderContents(FolderDBCalls);
    try {
        this.result = await getFolderContents(this.folderId, this.user, this.page, this.pageSize);
    } catch (error) {
        this.error = error;
    }
});

Then('It should return folders: {string}, files: {string}, totalItems: {string}, totalPages: {string}, currentPage: {string}, pageSize: {string}', function (folders, files, totalItems, totalPages, currentPage, pageSize) {
   console.log(this.result,"____________",folders, files, totalItems, totalPages, currentPage, pageSize)  
  expect(this.result).to.have.property('folders').that.deep.equals(JSON.parse(folders));
    expect(this.result).to.have.property('files').that.deep.equals(JSON.parse(files));
    expect(this.result).to.have.property('totalItems').that.equals(parseInt(totalItems, 10));
    expect(this.result).to.have.property('totalPages').that.equals(parseInt(totalPages, 10));
    expect(this.result).to.have.property('currentPage').that.equals(String(currentPage));
    expect(this.result).to.have.property('pageSize').that.equals(parseInt(pageSize, 10));
});

Then('It should throw an error with message: {string}', function (error) {

    expect(this.error.msg).to.equal(error);
});
