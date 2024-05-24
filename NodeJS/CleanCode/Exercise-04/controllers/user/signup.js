module.exports = function makeSignupController(userUseCases, sendSuccess, sendError) {
    return async function signupController(req, res) {
        try {
            const response = await userUseCases.signupUser(req.body);
            sendSuccess(res, { msg: response.msg, token: response.token }, response.status);
        } catch (error) {
            sendError(res, { msg: error.msg, error: error.error }, error.status || 500);
        }
    };
};



