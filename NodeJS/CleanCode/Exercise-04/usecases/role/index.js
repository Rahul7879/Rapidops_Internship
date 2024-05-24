const {roleDBCalls} = require('../../data-access')
const {sendMail} = require("../../utilities/send-mail.js")
const jwt = require('jsonwebtoken');


const makeCreateRole = require("./create-role");
const makeInviteRole = require("./invite-role");
const makeAcceptRequest = require("./accept-request");


const createRole = makeCreateRole(roleDBCalls)
const inviteRole = makeInviteRole(roleDBCalls,sendMail)
const acceptRequest = makeAcceptRequest(roleDBCalls,jwt);

module.exports = Object.freeze({
    createRole,
    inviteRole,
    acceptRequest
});
