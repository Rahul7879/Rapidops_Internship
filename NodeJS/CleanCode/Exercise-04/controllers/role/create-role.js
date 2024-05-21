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

module.exports = createRole