module.exports = function makeMoveFile(fileUseCases, sendSuccess, sendError) {
    return async function moveFile(req, res) {
        try {
            await fileUseCases.moveFile(+req.params.fileId, req.body.newFolderId, req.user);
            sendSuccess(res, { msg: 'File moved successfully' }, 200);
        } catch (error) {
            console.error('Error moving file:', error);
            sendError(res, { msg: error.msg || 'Error moving file', error: error.message }, error.status || 500);
        }
    };
};


