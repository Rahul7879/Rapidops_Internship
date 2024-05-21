const { loginUserInTenant } = require('../../usecases/user/index.js');
const roleGateway = require('../../gateways/roles.js'); 
const { sendSuccess, sendError } = require('../../utilities/response.js');

const loginInTenant = async (req, res) => {
    try {
        const response = await loginUserInTenant(req.params, req.user, roleGateway);
        res.setHeader(
            'Set-Cookie',
            `accessToken=${response.token}; Path=/; HttpOnly; SameSite=None; Secure; Max-Age=${process.env.COOKIE_AGE}`
        );
        sendSuccess(res, { msg: 'Tenant login successful', tenantId: response.tenantId }, 200);
    } catch (error) {
        console.error("Tenant login error:", error.msg);
        sendError(res, { msg: 'Error while logging in to tenant', error: error.msg }, error.status || 500);
    }
};

module.exports = loginInTenant
