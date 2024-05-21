const roleUseCases = require('../../usecases/role/index');
const roleGateway = require('../../gateways/roles.js');
const { sendSuccess, sendError } = require('../../utilities/response.js');

const inviteRole = async (req, res) => {
    try {
        await roleUseCases.inviteRole(req.body, req.user, roleGateway);
        sendSuccess(res, { msg: 'Role invitations sent successfully' }, 200);
    } catch (error) {
        console.error('Error inviting role:', error);
        sendError(res, { msg: 'Error sending role invitations', error: error.msg || error.message }, error.status || 500);
    }
};

module.exports = inviteRole