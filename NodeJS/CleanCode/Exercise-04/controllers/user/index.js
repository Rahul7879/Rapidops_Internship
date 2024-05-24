const {userUseCases} = require('../../usecases');
const { sendSuccess, sendError } = require('../../utilities/response.js');

const makeSignupControllerAction = require('./signup.js');
const makeLoginControllerAction = require('./login.js');
const makeLoginInTenantAction = require('./login-in-tenant.js')
const makeForgotPasswordAction = require('./forget-password.js')
const makeResetPasswordAction = require("./reset-password.js")



const signupControllerAction = makeSignupControllerAction(userUseCases,sendSuccess,sendError)
const loginControllerAction = makeLoginControllerAction(userUseCases,sendSuccess,sendError)
const loginInTenantAction = makeLoginInTenantAction(userUseCases,sendSuccess,sendError)
const forgetPasswordAction = makeForgotPasswordAction(userUseCases,sendSuccess,sendError)
const resetPasswordAction = makeResetPasswordAction(userUseCases,sendSuccess,sendError)



module.exports = Object.freeze({
    signupControllerAction,
    loginControllerAction,
    loginInTenantAction,
    forgetPasswordAction,
    resetPasswordAction
});
