module.exports = function makeDeleteFolder(folderUseCases, sendSuccess, sendError) {
    return async function deleteFolder(req, res) {
        try {
            const assignedFolders = await folderUseCases.getAllAssignedFolders(req.user);
            sendSuccess(res, { assignedFolders }, 200);
        } catch (error) {
            console.error('Error getting assigned folders:', error);
            sendError(res, { msg: error.msg || 'Error getting assigned folders', error: error.message }, error.status || 500);
        }
    };
};
