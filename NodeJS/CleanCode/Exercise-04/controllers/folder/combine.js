const folderUseCases = require('../../usecases/folder/index.js');
const folderGateway = require('../../gateways/folder.js');
const { sendSuccess, sendError } = require('../../utilities/response.js');

const createFolder = async (req, res) => {
    try {
        console.log(folderGateway)
        await folderUseCases.createFolder(req.body, req.user, folderGateway);
        sendSuccess(res, { msg: 'Folder created successfully' }, 201);
    } catch (error) {
        console.error('Error creating folder:', error);
        sendError(res, { msg: error.msg || 'Error during folder creation', error: error.message }, error.status || 500);
    }
};

const deleteFolder = async (req, res) => {
    try {
        await folderUseCases.deleteFolder(+req.params.folderId, req.user, folderGateway);
        sendSuccess(res, { msg: 'Folder deleted successfully' }, 200);
    } catch (error) {
        console.error('Error deleting folder:', error);
        sendError(res, { msg: error.msg || 'Error deleting folder', error: error.message }, error.status || 500);
    }
};

const moveFolder = async (req, res) => {
    try {
        await folderUseCases.moveFolder(+req.params.folderId, req.body.newParentFolder, req.user, folderGateway);
        sendSuccess(res, { msg: 'Folder moved successfully' }, 200);
    } catch (error) {
        console.error('Error moving folder:', error);
        sendError(res, { msg: error.msg || 'Error moving folder', error: error.message }, error.status || 500);
    }
};

const assignFoldersToRole = async (req, res) => {
    try {
        await folderUseCases.assignFoldersToRole(req.body.folders, req.params.roleId, req.user, folderGateway);
        sendSuccess(res, { msg: 'Folders assigned to role successfully' }, 200);
    } catch (error) {
        console.error('Error assigning folders to role:', error);
        sendError(res, { msg: error.msg || 'Error assigning folders to role', error: error.message }, error.status || 500);
    }
};

const getAllAssignedFolders = async (req, res) => {
    try {
        const assignedFolders = await folderUseCases.getAllAssignedFolders(req.user, folderGateway);
        sendSuccess(res, { assignedFolders }, 200);
    } catch (error) {
        console.error('Error getting assigned folders:', error);
        sendError(res, { msg: error.msg || 'Error getting assigned folders', error: error.message }, error.status || 500);
    }
};

module.exports = {
    createFolder,
    deleteFolder,
    moveFolder,
    assignFoldersToRole,
    getAllAssignedFolders,
};