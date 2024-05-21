const { signupUser } = require('../../usecases/user/index');
const userGateway = require('../../gateways/user.js');
const { sendSuccess, sendError } = require('../../utilities/response.js');

const signupController = async (req, res) => {
    try {
        const response = await signupUser(req.body, userGateway);
        console.log("hello",response)
        sendSuccess(res, { msg: response.msg, token: response.token }, response.status);
    } catch (error) {
        sendError(res, { msg: error.msg, error: error.error }, error.status || 500);
    }
};

module.exports = signupController;
