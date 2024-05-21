const fileUseCases = require('../../usecases/file/index.js');
const fileGateway = require('../../gateways/files.js');
const { sendSuccess, sendError } = require('../../utilities/response.js');

const moveFile = async (req, res) => {
    try {
        await fileUseCases.moveFile(+req.params.fileId, req.body.newFolderId, req.user, fileGateway);
        sendSuccess(res, { msg: 'File moved successfully' }, 200);
    } catch (error) {
        console.error('Error moving file:', error);
        sendError(res, { msg: error.msg || 'Error moving file', error: error.message }, error.status || 500);
    }
};

module.exports = moveFile
