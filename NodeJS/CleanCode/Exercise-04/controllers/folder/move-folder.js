module.exports = function makeCreateFolder(folderUseCases, sendSuccess, sendError) {
    return async function createFolder(req, res) {
        try {
            await folderUseCases.moveFolder(+req.params.folderId, req.body.newParentFolder, req.user);
            sendSuccess(res, { msg: 'Folder moved successfully' }, 200);
        } catch (error) {
            console.error('Error moving folder:', error);
            sendError(res, { msg: error.msg || 'Error moving folder', error: error.message }, error.status || 500);
        }
    };
};

