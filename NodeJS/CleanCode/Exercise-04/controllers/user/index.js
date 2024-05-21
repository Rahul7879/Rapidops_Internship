const signupController = require('./signup.js');
const loginController = require('./login.js');
const loginInTenant = require('./login-in-tenant.js')

module.exports = {
    signupController,
    loginController,
    loginInTenant
};

console.log(loginInTenant)