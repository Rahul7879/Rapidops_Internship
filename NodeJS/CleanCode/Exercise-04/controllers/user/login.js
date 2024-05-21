const { loginUser } = require('../../usecases/user/index');
const userGateway = require('../../gateways/user.js');
const { sendSuccess, sendError } = require('../../utilities/response.js');

const loginController = async (req, res) => {
    try {
        const response = await loginUser(req.body, userGateway);
        res.setHeader(
            'Set-Cookie',
            `accessToken=${response.token}; Path=/; HttpOnly; SameSite=None; Secure; Max-Age=${process.env.COOKIE_AGE}`
          );
        sendSuccess(res, { msg: response.msg, my_tenant: response.my_tenant, added_in: response.added_in }, response.status);
    } catch (error) {
        sendError(res, { msg: error.msg, error: error.error }, error.status || 500);
    }
};

module.exports = loginController;
