const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const ResponseHandler = require('../utilities/response.js');
const pool = require('../db/conn.js')

const verifyUser = async (req, res, next) => {

    const cookie = req.headers.cookie;
    const token = cookie ? cookie.split('=')[1] : null;

    if (!token) {
        ResponseHandler.sendError(res, { msg: "Access Denied: No token provided" }, 401);
        return;
    }

    try {
    
        const query = 'SELECT * FROM sessions WHERE sessionId = ? LIMIT 1';
        const [users] = await pool.query(query, [token]);
        if(users[0].length === 0){
            ResponseHandler.sendError(res, { msg: "Invalid Session" }, 401)
            return;
        }

        const jwtToken = users[0].jwtToken;
        const decoded = jwt.verify(jwtToken, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        ResponseHandler.sendError(res, { msg: "Invalid Token" }, 401)
    }
};

module.exports = verifyUser;
