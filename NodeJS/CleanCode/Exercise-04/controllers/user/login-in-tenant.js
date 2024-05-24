module.exports = function makeLoginInTenant(userUseCases, sendSuccess, sendError) {
    return async function loginInTenant(req, res) {
        try {
            const response = await userUseCases.loginUserInTenant(req.params, req.user);
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
};
