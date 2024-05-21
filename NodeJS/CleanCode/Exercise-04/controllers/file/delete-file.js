const fileUseCases = require('../../usecases/file/index.js');
const fileGateway = require('../../gateways/files.js');
const { sendSuccess, sendError } = require('../../utilities/response.js');


const deleteFile = async (req, res) => {
    try {
        await fileUseCases.deleteFile(+req.params.fileId, req.user, fileGateway);
        sendSuccess(res, { msg: 'File deleted successfully' }, 200);
    } catch (error) {
        console.error('Error deleting file:', error);
        sendError(res, { msg: error.msg || 'Error deleting file', error: error.message }, error.status || 500);
    }
};

module.exports = deleteFile
