const { OAuth2Client } = require('google-auth-library');
const url = require('url');
const ResponseHandler = require('../utilities/response');
const jwt = require("jsonwebtoken");

const CLIENT_ID = '807518570465-teq45qgsvbi557cpc7po95f4uikl59l9.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:8000/oauth2callback';
const SECRET_KEY = "my_secret_key";  

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
            console.log(userInfo)
            const accessToken = jwt.sign({ userInfo: userInfo }, SECRET_KEY, { expiresIn: '24h' });
            
            res.setHeader('Set-Cookie', `accessToken=${accessToken}; Path=/; HttpOnly; SameSite=None; Secure`);
            res.writeHead(302, { 'Location': 'http://localhost:3000/'  });
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
