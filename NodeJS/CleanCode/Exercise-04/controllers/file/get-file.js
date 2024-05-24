module.exports = function makeGetFile(fileUseCases, sendSuccess, sendError,fs) {
    return async function getFile(req, res) {
        try {
            const { filePath } = await fileUseCases.getFile(+req.params.fileId, req.user);
            const contentType = fileUseCases.getContentType(filePath);
            res.setHeader('Content-Type', contentType);
            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);
        } catch (error) {
            console.error('Error fetching file:', error);
            sendError(res, { msg: error.msg || 'Error fetching file', error: error.message }, error.status || 500);
        }
    };
};
