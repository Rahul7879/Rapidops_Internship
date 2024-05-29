module.exports = function makeUploadFile(fileUseCases, sendSuccess, sendError) {

    return async function uploadFile(req, res) {
        const files = req.files;
        try {
            await fileUseCases.uploadFile(files, req.body, req.user);
            sendSuccess(res, { msg: 'File uploaded successfully' }, 201);
        } catch (error) {
            console.error('Error uploading file:', error);
            sendError(res, { msg: error.msg || 'Error uploading file', error: error.message }, error.status || 500);
        }
    };
};
