module.exports = function makeResetPasswordController(userUseCases, sendSuccess, sendError) {
    return async function resetPasswordController(req, res) {
        try {
            const response = await userUseCases.resetPassword(req.queryParams.token,req.body.newPassword);
            sendSuccess(res, { msg: response.msg }, response.status);
        } catch (error) {
            sendError(res, { msg: error.msg, error: error.error }, error.status || 500);
        }
    };
};
