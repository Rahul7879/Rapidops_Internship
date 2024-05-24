module.exports = function makeDeleteFolder(folderUseCases, sendSuccess, sendError) {
    return async function deleteFolder(req, res) {
        try {
            await folderUseCases.deleteFolder(+req.params.folderId, req.user);
            sendSuccess(res, { msg: 'Folder deleted successfully' }, 200);
        } catch (error) {
            console.error('Error deleting folder:', error);
            sendError(res, { msg: error.msg || 'Error deleting folder', error: error.message }, error.status || 500);
        }
    };
};
