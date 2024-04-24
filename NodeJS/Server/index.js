const http = require('http');
const {config} = require("./constants.js")
const Router = require('./utilities/router.js');
const url = require("url")

const router = new Router();
console.log(router);
const PORT = config.PORT;

require('./routes/user.routes.js')(router);
require('./routes/product.routes.js')(router);


const server = http.createServer((req, res) => {
    router.handle(req, res);
});

server.listen(config.PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
