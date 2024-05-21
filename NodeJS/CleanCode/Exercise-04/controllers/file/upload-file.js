const fileUseCases = require('../../usecases/file/index.js');
const fileGateway = require('../../gateways/files.js');
const { sendSuccess, sendError } = require('../../utilities/response.js');

const uploadFile = async (req, res) => {
    const files = req.files;
    try {
        await fileUseCases.uploadFile(files, req.body, req.user, fileGateway);
        sendSuccess(res, { msg: 'File uploaded successfully' }, 201);
    } catch (error) {
        console.error('Error uploading file:', error);
        sendError(res, { msg: error.msg || 'Error uploading file', error: error.message }, error.status || 500);
    }
};

module.exports = uploadFile