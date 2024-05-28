module.exports = function makeApproveTempRoleController(
    roleUseCases,
    sendSuccess,
    sendError
) {
    return async function approveTempRoleController(req, res) {
        try {
            console.log("hello",req.queryParams)
            const token = req.queryParams.token;
            console.log(token)
            await roleUseCases.approveTempRole(token);
            sendSuccess(res, { msg: 'Temporary role approved and user notified' }, 200);
        } catch (error) {
            sendError(res, { msg: error.msg || 'Error processing request', error: error.message }, error.status || 500);
        }
    };
};
