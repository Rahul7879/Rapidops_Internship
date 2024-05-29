module.exports = function makeFolderContentController(folderUseCases, sendSuccess, sendError) {
    return async function folderContentController(req, res) {
        const { folderId } = req.params;
        const { page = 1, pageSize = 10 } = req.queryParams;

        try {
            const user = req.user; 
            const response = await folderUseCases.getFolderContents(folderId, user, page, pageSize);
            sendSuccess(res, response, 200);
        } catch (error) {
            console.error('Error fetching folder contents:', error);
            sendError(res, { msg: error.msg || 'Error fetching folder contents', error: error.message }, error.status || 500);
        }
    };
};
