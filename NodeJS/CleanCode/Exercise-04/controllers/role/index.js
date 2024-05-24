const {roleUseCases} = require('../../usecases');
const { sendSuccess, sendError } = require('../../utilities/response.js');

const makeCreateRoleAction = require("./create-role")
const makeInviteRoleAction = require("./invite-role")
const makeAcceptRequestAction = require("./accept-role")


const createRoleAction = makeCreateRoleAction(roleUseCases,sendSuccess,sendError)
const inviteRoleAction = makeInviteRoleAction(roleUseCases,sendSuccess,sendError)
const acceptRequestAction = makeAcceptRequestAction(roleUseCases,sendSuccess,sendError)



module.exports = Object.freeze({
    createRoleAction,
    inviteRoleAction,
    acceptRequestAction
});
