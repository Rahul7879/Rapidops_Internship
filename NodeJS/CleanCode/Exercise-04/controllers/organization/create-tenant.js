module.exports = function makeCreateTenant(tenantUseCases, sendSuccess, sendError) {
    return async function createTenant(req, res) {
        try {
            const { email } = req.user;
            const orgName = req.body.tenantName;
  

            await tenantUseCases.createTenant(email, orgName);
            
            sendSuccess(res, { msg: 'SignUp, organization creation, and admin role assignment successful' }, 201);
        } catch (e) {
            console.error(e);
            sendError(res, { msg: 'Error during creating tenant', error: e.message }, e.status || 500);
        }
    };
};
