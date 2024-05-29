module.exports = function makeAssignFoldersToRole(folderUseCases, sendSuccess, sendError) {
    return async function assignFoldersToRole(req, res) {
        try {
            await folderUseCases.assignFoldersToRole(req.body.folders, req.params.roleId, req.user);
            sendSuccess(res, { msg: 'Folders assigned to role successfully' }, 200);
        } catch (error) {
            console.error('Error assigning folders to role:', error);
            sendError(res, { msg: error.msg || 'Error assigning folders to role', error: error.message }, error.status || 500);
        }
    };
};

