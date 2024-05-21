const folderUseCases = require('../../usecases/folder/index.js');
const folderGateway = require('../../gateways/folder.js');
const { sendSuccess, sendError } = require('../../utilities/response.js');

const assignFoldersToRole = async (req, res) => {
    try {
        await folderUseCases.assignFoldersToRole(req.body.folders, req.params.roleId, req.user, folderGateway);
        sendSuccess(res, { msg: 'Folders assigned to role successfully' }, 200);
    } catch (error) {
        console.error('Error assigning folders to role:', error);
        sendError(res, { msg: error.msg || 'Error assigning folders to role', error: error.message }, error.status || 500);
    }
};

module.exports = assignFoldersToRole
