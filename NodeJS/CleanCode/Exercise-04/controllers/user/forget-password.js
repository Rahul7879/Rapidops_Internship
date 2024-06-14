module.exports = function makeForgotPasswordController(userUseCases, sendSuccess, sendError) {
    return async function forgotPasswordController(req, res) {
        try {
  
            const response = await userUseCases.forgotPassword(req.body);
            sendSuccess(res, { msg: response.msg }, response.status);
        } catch (error) {
            sendError(res, { msg: error.msg, error: error.error }, error.status || 500);
        }
    };
};
