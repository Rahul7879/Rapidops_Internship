const {folderDBCalls} = require('../../data-access')

const makeCreateFolder = require("./create-folder");
const makeDeleteFolder = require("./delete-folder");
const makeMoveFolder = require("./move-folder");
const makeAssignFoldersToRole = require("./assign-folder");
const makeGetAllAssignedFolders = require("./get-all-folder")
const makeGetFolderContents = require('./get-folder-content')


const createFolder = makeCreateFolder(folderDBCalls)
const deleteFolder = makeDeleteFolder(folderDBCalls)
const moveFolder = makeMoveFolder(folderDBCalls)
const assignFoldersToRole = makeAssignFoldersToRole(folderDBCalls)
const getAllAssignedFolders = makeGetAllAssignedFolders(folderDBCalls)
const getFolderContents = makeGetFolderContents(folderDBCalls)

module.exports = Object.freeze({
    createFolder,
    deleteFolder,
    moveFolder,
    assignFoldersToRole,
    getAllAssignedFolders,
    getFolderContents
});

