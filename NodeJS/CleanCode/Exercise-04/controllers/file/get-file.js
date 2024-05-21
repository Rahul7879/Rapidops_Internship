const fileUseCases = require('../../usecases/file/index.js');
const fileGateway = require('../../gateways/files.js');
const { sendSuccess, sendError } = require('../../utilities/response.js');
const path = require("path")


const getFile = async (req, res) => {
    try {
        const { filePath, fileDetails } = await fileUseCases.getFile(+req.params.fileId, req.user, fileGateway);
        const contentType = getContentType(filePath);
        res.setHeader('Content-Type', contentType);
        const fileStream = fileGateway.createReadStream(filePath);
        fileStream.pipe(res);
    } catch (error) {
        console.error('Error fetching file:', error);
        sendError(res, { msg: error.msg || 'Error fetching file', error: error.message }, error.status || 500);
    }
};

function getContentType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
        case '.txt':
            return 'text/plain';
        case '.html':
            return 'text/html';
        case '.js':
            return 'application/javascript';
        case '.json':
            return 'application/json';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        case '.gif':
            return 'image/gif';
        case '.pdf':
            return 'application/pdf';
        default:
            return 'application/octet-stream';
    }
}

module.exports = getFile
