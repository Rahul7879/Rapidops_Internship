module.exports = function makeGetContentType(path){
    return function getContentType(filePath) {
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
    
}