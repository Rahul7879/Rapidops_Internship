const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const {userDBCalls} = require('../../data-access')


const makeSignUpUser = require('./signup');
const makeLoginUSer = require('./login');
const  makeLoginUserInTenant  = require('./log-in-tenant');

const signupUser = makeSignUpUser(userDBCalls,bcrypt,jwt,SECRET_KEY)
const loginUser = makeLoginUSer(userDBCalls,bcrypt,jwt,SECRET_KEY)
const loginUserInTenant= makeLoginUserInTenant(userDBCalls,jwt,SECRET_KEY)


module.exports = Object.freeze({
    signupUser,
    loginUser,
    loginUserInTenant
});
