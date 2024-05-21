class ResponseHandler {
    static sendSuccess(res, data, statusCode = 200, contentType = 'application/json') {
        res.writeHead(statusCode, { 'Content-Type': contentType });
        res.end(JSON.stringify({
            status: 'success',
            data
        }));
    }

    static sendError(res, message, statusCode = 500, contentType = 'application/json') {
        res.writeHead(statusCode, { 'Content-Type': contentType });
        res.end(JSON.stringify({
            status: 'error',
            message
        }));
    }
}

module.exports = ResponseHandler;
