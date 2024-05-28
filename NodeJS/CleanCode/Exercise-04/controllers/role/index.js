const {roleUseCases} = require('../../usecases');
const { sendSuccess, sendError } = require('../../utilities/response.js');

const makeCreateRoleAction = require("./create-role")
const makeInviteRoleAction = require("./invite-role")
const makeAcceptRequestAction = require("./accept-role")
const makeApproveTempRoleController = require("./temp-role-approval.js");
const makeRequestTempRoleController = require("./temp-role-request.js")


const createRoleAction = makeCreateRoleAction(roleUseCases,sendSuccess,sendError)
const inviteRoleAction = makeInviteRoleAction(roleUseCases,sendSuccess,sendError)
const acceptRequestAction = makeAcceptRequestAction(roleUseCases,sendSuccess,sendError)
const approveTempRole = makeApproveTempRoleController(roleUseCases,sendSuccess,sendError)
const requestTempRole = makeRequestTempRoleController(roleUseCases,sendSuccess,sendError)




module.exports = Object.freeze({
    createRoleAction,
    inviteRoleAction,
    acceptRequestAction,
    approveTempRole,
    requestTempRole,
});
