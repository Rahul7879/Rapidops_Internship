const folderUseCases = require('../../usecases/folder/index.js');
const folderGateway = require('../../gateways/folder.js');
const { sendSuccess, sendError } = require('../../utilities/response.js');

const getAllAssignedFolders = async (req, res) => {
    try {
        const assignedFolders = await folderUseCases.getAllAssignedFolders(req.user, folderGateway);
        sendSuccess(res, { assignedFolders }, 200);
    } catch (error) {
        console.error('Error getting assigned folders:', error);
        sendError(res, { msg: error.msg || 'Error getting assigned folders', error: error.message }, error.status || 500);
    }
};

module.exports = getAllAssignedFolders