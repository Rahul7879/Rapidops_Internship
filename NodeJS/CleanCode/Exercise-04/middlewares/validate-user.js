const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const ResponseHandler = require('../utilities/response.js');

const verifyUser = (req, res, next) => {

    const cookie = req.headers.cookie;
    const token = cookie ? cookie.split('=')[1] : null;

    if (!token) {
        ResponseHandler.sendError(res, { msg: "Access Denied: No token provided" }, 401);
        return;
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next()
    } catch (error) {
        ResponseHandler.sendError(res, { msg: "Invalid Tokenn" }, 404)
    }
};

module.exports = verifyUser;