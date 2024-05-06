const url = require('url');
const ResponseHandler = require('../utilities/response');
const { OAuth2Client } = require('google-auth-library');
const jwt = require("jsonwebtoken");
const pool = require("../db/conn.js")

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = `http://localhost:${process.env.PORT}/oauth2callback`;
const SECRET_KEY = process.env.SECRET_KEY;


const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
const SCOPES = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'];

async function getTokens(code) {
    try {
        const { tokens } = await oAuth2Client.getToken(code);
        return tokens;
    } catch (err) {
        console.error('Failed to exchange token:', err);
        throw err;
    }
}
async function getUserInfo(accessToken) {
    try {
        oAuth2Client.setCredentials({ access_token: accessToken });
        const userInfoResponse = await oAuth2Client.request({ url: 'https://www.googleapis.com/oauth2/v3/userinfo' });
        return userInfoResponse.data;
    } catch (err) {
        console.error('Failed to retrieve user info:', err);
        throw err;
    }
}


const AuthToCallback = async (req, res) => {
    const reqUrl = url.parse(req.url, true);
    const code = reqUrl.query.code;
    if (code) {
        try {
            const tokens = await getTokens(code);
            const userInfo = await getUserInfo(tokens.access_token);



            const checkTableQuery = "SHOW TABLES LIKE 'users'";
            const [tables] = await pool.execute(checkTableQuery);

            if (tables.length === 0) {
                const createTableQuery = `
                    CREATE TABLE users (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        email VARCHAR(255) UNIQUE NOT NULL,
                        password VARCHAR(255),
                        fullName VARCHAR(255)
                    )
                `;
                await pool.execute(createTableQuery);
            }


            const query = 'SELECT * FROM users WHERE email = ? LIMIT 1';
            const [users] = await pool.query(query, [userInfo.email]);

            if (users.length === 0) {
                const query = 'INSERT INTO users (email,fullName) VALUES (?,?)';
                await pool.execute(query, [userInfo.email, userInfo.name]);
            }

            const accessToken = jwt.sign({ email: userInfo.email }, SECRET_KEY, { expiresIn: '24h' });
            res.setHeader('Set-Cookie', `accessToken=${accessToken}; Path=/; HttpOnly; SameSite=None; Secure`);
            res.writeHead(302, { 'Location': 'http://localhost:3000/' });
            res.end();
        } catch (e) {
            console.error('Error handling OAuth callback:', e);
            ResponseHandler.sendError(res, { msg: 'Failed to handle OAuth callback' }, 500);
        }
    } else {
        ResponseHandler.sendError(res, { msg: 'Authorization code is missing' }, 400);
    }
};

const getAuthUrlFunction = (req, res) => {
    try {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        ResponseHandler.sendSuccess(res, { url: authUrl }, 200);
    } catch (error) {
        console.error('Error generating auth URL:', error);
        ResponseHandler.sendError(res, { msg: 'Failed to generate auth URL', error: error.message }, 500);
    }
};

module.exports = { AuthToCallback, getAuthUrlFunction };
