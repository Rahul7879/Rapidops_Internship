module.exports = function makeInviteRole(roleUseCases, sendSuccess, sendError) {
    return async function inviteRole(req, res) {
        try {
        
            await roleUseCases.inviteRole(req.body, req.user);
            sendSuccess(res, { msg: 'Role invitations sent successfully' }, 200);
        } catch (error) {
            console.error('Error inviting role:', error);
            sendError(res, { msg: 'Error sending role invitations', error: error.msg || error.message }, error.status || 500);
        }
    };
};

