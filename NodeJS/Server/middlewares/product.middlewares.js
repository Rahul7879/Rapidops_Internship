function logMiddleware(req, res, next) {
    console.log(`Request to ${req.url} received`);
    next();
}

function authMiddleware(req, res, next) {
    if (req.headers.authorization) {
        next();
    } else {
        res.writeHead(403);
        res.end("Not Authorized");
    }
}

module.exports = {logMiddleware,authMiddleware}