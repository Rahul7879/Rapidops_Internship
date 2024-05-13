const http = require('node:http');
const Router = require('./utilities/Router.js');
const router = new Router();
require("dotenv").config();
const PORT = process.env.PORT;

require('./routes/user-routes.js')(router);
require('./routes/organization-routes.js')(router);
require('./routes/roles-routes.js')(router);
require('./routes/folder-routes.js')(router);
require('./routes/file-routes.js')(router);



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
