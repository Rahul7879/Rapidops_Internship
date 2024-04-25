const http = require('node:http');
const {config} = require("./constants.js")
const Router = require('./utilities/Router.js');
const router = new Router();
const PORT = config.PORT;

require('./routes/user.routes.js')(router);
require('./routes/product.routes.js')(router);

const server = http.createServer((req, res) => {
    router.handle(req, res);
});

server.listen(config.PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
