module.exports = function makeAcceptRequest(roleUseCases, sendSuccess, sendError) {
    return async function acceptRequest(req, res) {
        try {
            await roleUseCases.acceptRequest(req.params.token);
            sendSuccess(res, { msg: 'Role invitation accepted successfully' }, 200);
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                sendError(res, { msg: 'Token validation failed', error: error.message }, 401);
            } else {
                console.error('Error accepting request:', error);
                sendError(res, { msg: 'Error processing the role acceptance', error: error.msg || error.message }, error.status || 500);
            }
        }
    };
};

