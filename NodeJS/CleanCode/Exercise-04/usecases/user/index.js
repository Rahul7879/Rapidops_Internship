const { signupUser } = require('./signup');
const { loginUser } = require('./login');
const  loginUserInTenant  = require('./log-in-tenant');


module.exports = {
    signupUser,
    loginUser,
    loginUserInTenant
};
