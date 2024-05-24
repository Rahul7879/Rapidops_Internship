module.exports = function makeCreateFolder(folderUseCases, sendSuccess, sendError) {
    return async function createFolder(req, res) {
        try {
            await folderUseCases.createFolder(req.body, req.user);
            sendSuccess(res, { msg: 'Folder created successfully' }, 201);
        } catch (error) {
            console.error('Error creating folder:', error);
            sendError(res, { msg: error.msg || 'Error during folder creation', error: error.message }, error.status || 500);
        }
    };
};

