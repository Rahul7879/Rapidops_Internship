const {roleDBCalls, userDBCalls} = require('../../data-access')
const {sendMail} = require("../../utilities/send-mail.js")
const mailer = require("../../utilities/mailer.js")
const jwt = require('jsonwebtoken');


const makeCreateRole = require("./create-role");
const makeInviteRole = require("./invite-role");
const makeAcceptRequest = require("./accept-request");
const makeTempRoleRequest = require('./temp-role-request.js')
const makeApproveTempRole = require("./temp-role-approval.js")


const createRole = makeCreateRole(roleDBCalls)
const inviteRole = makeInviteRole(roleDBCalls,sendMail)
const acceptRequest = makeAcceptRequest(roleDBCalls,jwt);
const requestTempRole = makeTempRoleRequest(userDBCalls,mailer,jwt);
const approveTempRole = makeApproveTempRole(roleDBCalls,mailer,jwt);


module.exports = Object.freeze({
    createRole,
    inviteRole,
    acceptRequest,
    requestTempRole,
    approveTempRole
});
