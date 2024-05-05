const jwt = require('jsonwebtoken');
const SECRET_KEY = "my_secret_key"; // This should be an environment variable in production
const ResponseHandler = require('../utilities/response.js');

const verifyUser = (req, res, next) => {
  
    const cookie = req.headers.cookie;
    const token = cookie ? cookie.split('=')[1] : null;

    if (!token ) {
       ResponseHandler.sendError(res,{ msg: "Access Denied: No token provided" },401);
       return;
    } 

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; 
        next(); 
    } catch (error) {
        ResponseHandler.sendSuccess(res,{ msg: "Invalid Token" },401)
    }
};

module.exports = verifyUser;
