const makeCreateFolderAction = require("./create-folder")
const makeDeleteFolderAction = require("./delete-folder")
const makeMoveFolderAction = require("./move-folder")
const makeAssignFoldersToRoleAction = require("./assign-folder")
const makeGetAllAssignedFoldersAction = require("./get-all-assigned-folder")
const makeGetFolderContentsAction = require('./get-folder-content.js')

const {folderUseCases} = require('../../usecases');
const { sendSuccess, sendError } = require('../../utilities/response.js');

const createFolderAction = makeCreateFolderAction(folderUseCases, sendSuccess, sendError);
const assignFoldersToRoleAction = makeAssignFoldersToRoleAction(folderUseCases, sendSuccess, sendError);
const moveFolderAction = makeMoveFolderAction(folderUseCases, sendSuccess, sendError);
const deleteFolderAction = makeDeleteFolderAction(folderUseCases, sendSuccess, sendError);
const getAllAssignedFoldersAction = makeGetAllAssignedFoldersAction(folderUseCases,sendSuccess,sendError)
const getFolderContentAction = makeGetFolderContentsAction(folderUseCases,sendSuccess,sendError)



module.exports = Object.freeze({
    createFolderAction,
    deleteFolderAction,
    assignFoldersToRoleAction,
    moveFolderAction,
    getAllAssignedFoldersAction,
    getFolderContentAction
});
