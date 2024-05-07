const url = require('url');
const https = require('https');
const jwt = require("jsonwebtoken");
const ResponseHandler = require('../utilities/response');
const pool = require("../db/conn.js");
const {createSession} = require('./session.js')

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = `http://localhost:${process.env.PORT}/oauth2callback`;
const SECRET_KEY = process.env.SECRET_KEY;

const SCOPES = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'];

function getTokens(code) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            code: code,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code'
        });

        const options = {
            hostname: 'oauth2.googleapis.com',
            port: 443,
            path: '/token',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = https.request(options, res => {
            let responseData = '';

            res.on('data', chunk => {
                responseData += chunk;
            });

            res.on('end', () => {
                resolve(JSON.parse(responseData));
            });
        });

        req.on('error', error => {
            reject(error);
        });

        req.write(data);
        req.end();
    });
}



function getUserInfo(accessToken) {
    return new Promise((resolve, reject) => {
        https.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }, res => {
            let responseData = '';

            res.on('data', chunk => {
                responseData += chunk;
            });

            res.on('end', () => {
                resolve(JSON.parse(responseData));
            });
        }).on('error', error => {
            reject(error);
        });
    });
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
            const token = jwt.sign({ email: userInfo.email }, SECRET_KEY, { expiresIn: '24h' });
            const sessionId = await createSession(token);
            
            res.setHeader(
                'Set-Cookie',
                `accessToken=${sessionId}; Path=/; HttpOnly; SameSite=None; Secure; Max-Age=${process.env.COOKIE_AGE}`
              );
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
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=${encodeURIComponent(SCOPES.join(' '))}&access_type=offline&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&client_id=${CLIENT_ID}`;
        ResponseHandler.sendSuccess(res, { url: authUrl }, 200);
    } catch (error) {
        console.error('Error generating auth URL:', error);
        ResponseHandler.sendError(res, { msg: 'Failed to generate auth URL', error: error.message }, 500);
    }
};

module.exports = { AuthToCallback, getAuthUrlFunction };
