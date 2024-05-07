const http = require('node:http');
const Router = require('./utilities/Router.js');
const router = new Router();
require("dotenv").config();;
require('./routes/index.js')(router);

const PORT = process.env.PORT;

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
