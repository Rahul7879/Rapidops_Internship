const folderUseCases = require('../../usecases/folder/index.js');
const folderGateway = require('../../gateways/folder.js');
const { sendSuccess, sendError } = require('../../utilities/response.js');

const moveFolder = async (req, res) => {
    try {
        await folderUseCases.moveFolder(+req.params.folderId, req.body.newParentFolder, req.user, folderGateway);
        sendSuccess(res, { msg: 'Folder moved successfully' }, 200);
    } catch (error) {
        console.error('Error moving folder:', error);
        sendError(res, { msg: error.msg || 'Error moving folder', error: error.message }, error.status || 500);
    }
};

module.exports = moveFolder