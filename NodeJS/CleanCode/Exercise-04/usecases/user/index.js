const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const {userDBCalls} = require('../../data-access')
const mailer = require("../../utilities/mailer")


const makeSignUpUser = require('./signup');
const makeLoginUSer = require('./login');
const  makeLoginUserInTenant  = require('./log-in-tenant');
const makeForgotPassword = require("./forget-password");
const makeResetPassword = require('./reset-password')

const signupUser = makeSignUpUser(userDBCalls,bcrypt,jwt,SECRET_KEY)
const loginUser = makeLoginUSer(userDBCalls,bcrypt,jwt,SECRET_KEY)
const loginUserInTenant= makeLoginUserInTenant(userDBCalls,jwt,SECRET_KEY)
const forgotPassword = makeForgotPassword(userDBCalls,jwt,SECRET_KEY,mailer)
const resetPassword = makeResetPassword(userDBCalls,bcrypt,jwt,SECRET_KEY)



module.exports = Object.freeze({
    signupUser,
    loginUser,
    loginUserInTenant,
    forgotPassword,
    resetPassword
});
