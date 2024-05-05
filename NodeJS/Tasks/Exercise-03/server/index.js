const http = require('node:http');
const Router = require('./utilities/Router.js');
const router = new Router();
const PORT = process.env.PORT || 8000;
require("dotenv").config();;
require('./routes/index.js')(router);

const server = http.createServer((req, res) => {
 
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST,DELETE,PUT,PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    router.handle(req, res);
});
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});







// const http = require('http');
// const { OAuth2Client } = require('google-auth-library');
// const url = require('url');

// const CLIENT_ID = '807518570465-teq45qgsvbi557cpc7po95f4uikl59l9.apps.googleusercontent.com';
// const CLIENT_SECRET = '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';
// const REDIRECT_URI = 'http://localhost:8000/oauth2callback';

// const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
// const SCOPES = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'];

// function getAuthUrl() {
//     return oAuth2Client.generateAuthUrl({
//         // Set CORS headers
//         access_type: 'offline', 
//         scope: SCOPES,
//     });
// }

// async function getTokens(code) {
//     try {
//         const { tokens } = await oAuth2Client.getToken(code);
//         return tokens;
//     } catch (err) {
//         console.error('Failed to exchange token:', err);
//         throw err;
//     }
// }

// const server = http.createServer(async (req, res) => {
//     const reqUrl = url.parse(req.url, true);

//     res.setHeader('Access-Control-Allow-Origin', '*'); 
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

//     if (req.method === 'OPTIONS') {
//         res.writeHead(204);
//         res.end();
//         return;
//     }

//     if (reqUrl.pathname === '/oauth2callback') {
//         const code = reqUrl.query.code;
//         if (code) {
//             try {
//                 const tokens = await getTokens(code);
//                 oAuth2Client.setCredentials(tokens);
//                 res.writeHead(302, { Location: `http://localhost:3000/` });
//                 res.end();
//             } catch (e) {
//                 res.writeHead(500, {'Content-Type': 'text/plain'});
//                 res.end(`Error: ${e}`);
//             }
//         } else {
//             res.writeHead(400, {'Content-Type': 'text/plain'});
//             res.end('Authorization code is missing');
//         }
//     } else if (reqUrl.pathname === '/get-auth-url') {
//         const authUrl = getAuthUrl();
//         res.writeHead(200, {'Content-Type': 'application/json'});
//         res.end(JSON.stringify({ url: authUrl }));
//     } else {
//         res.writeHead(404, {'Content-Type': 'text/plain'});
//         res.end('Not Found');
//     }
// });

// const PORT = 8000;
// server.listen(PORT, () => {
//     console.log(`Server listening on http://localhost:${PORT}`);
// });

//     // Set CORS headers