module.exports = function makeLoginController(userUseCases, sendSuccess, sendError) {
    return async function loginController(req, res) {
        try {
            const response = await userUseCases.loginUser(req.body);
            res.setHeader(
                'Set-Cookie',
                `accessToken=${response.token}; Path=/; HttpOnly; SameSite=None; Secure; Max-Age=${process.env.COOKIE_AGE}`
              );
            sendSuccess(res, { msg: response.msg, my_tenant: response.my_tenant, added_in: response.added_in }, response.status);
        } catch (error) {
            sendError(res, { msg: error.msg, error: error.error }, error.status || 500);
        }
    };
};


