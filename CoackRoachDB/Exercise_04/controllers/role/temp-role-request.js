module.exports = function makeRequestTempRoleController(roleUseCases,
    sendSuccess,
    sendError
) {
    return async function requestTempRoleController(req, res) {
        try {
            const { email, tenantId, userId,roleId } = req.user;
            const { tempUserEmail, hours } = req.body;
      
            await roleUseCases.requestTempRole({ email, tenantId, userId,roleId, tempUserEmail, hours });

            sendSuccess(res, { msg: 'Request sent to admin for approval' }, 200);
        } catch (error) {
            sendError(res, { msg: error.msg || 'Error processing request', error: error.message }, error.status || 500);
        }
    };
};
