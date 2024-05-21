const folderUseCases = require('../../usecases/folder/index.js');
const folderGateway = require('../../gateways/folder.js');
const { sendSuccess, sendError } = require('../../utilities/response.js');

const createFolder = async (req, res) => {
    try {
        await folderUseCases.createFolder(req.body, req.user, folderGateway);
        sendSuccess(res, { msg: 'Folder created successfully' }, 201);
    } catch (error) {
        console.error('Error creating folder:', error);
        sendError(res, { msg: error.msg || 'Error during folder creation', error: error.message }, error.status || 500);
    }
};

module.exports = createFolder