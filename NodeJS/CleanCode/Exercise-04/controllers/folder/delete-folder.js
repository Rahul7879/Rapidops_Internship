const folderUseCases = require('../../usecases/folder/index.js');
const folderGateway = require('../../gateways/folder.js');
const { sendSuccess, sendError } = require('../../utilities/response.js');

const deleteFolder = async (req, res) => {
    try {
        await folderUseCases.deleteFolder(+req.params.folderId, req.user, folderGateway);
        sendSuccess(res, { msg: 'Folder deleted successfully' }, 200);
    } catch (error) {
        console.error('Error deleting folder:', error);
        sendError(res, { msg: error.msg || 'Error deleting folder', error: error.message }, error.status || 500);
    }
};
module.exports = deleteFolder