const roleUseCases = require('../../usecases/role/index');
const roleGateway = require('../../gateways/roles.js');
const { sendSuccess, sendError } = require('../../utilities/response.js');

const createRole = async (req, res) => {
    try {
        await roleUseCases.createRole(req.body, req.user, roleGateway);
        sendSuccess(res, { msg: 'Role created successfully' }, 201);
    } catch (error) {
        console.error('Error creating role:', error);
        sendError(res, { msg: 'Error during role creation', error: error.msg || error.message }, error.status || 500);
    }
};

const inviteRole = async (req, res) => {
    try {
        await roleUseCases.inviteRole(req.body, req.user, roleGateway);
        sendSuccess(res, { msg: 'Role invitations sent successfully' }, 200);
    } catch (error) {
        console.error('Error inviting role:', error);
        sendError(res, { msg: 'Error sending role invitations', error: error.msg || error.message }, error.status || 500);
    }
};

const acceptRequest = async (req, res) => {
    try {
        await roleUseCases.acceptRequest(req.params.token, roleGateway);
        sendSuccess(res, { msg: 'Role invitation accepted successfully' }, 200);
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            sendError(res, { msg: 'Token validation failed', error: error.message }, 401);
        } else {
            console.error('Error accepting request:', error);
            sendError(res, { msg: 'Error processing the role acceptance', error: error.msg || error.message }, error.status || 500);
        }
    }
};

module.exports = {
    createRole,
    inviteRole,
    acceptRequest,
};
