module.exports = function makeMoveFile(fileUseCases, sendSuccess, sendError) {
    return async function moveFile(req, res) {
        try {
            await fileUseCases.deleteFile(req.params.fileId, req.user);
            sendSuccess(res, { msg: 'File deleted successfully' }, 200);
        } catch (error) {
            console.error('Error deleting file:', error);
            sendError(res, { msg: error.msg || 'Error deleting file', error: error.message }, error.status || 500);
        }
    };
};



