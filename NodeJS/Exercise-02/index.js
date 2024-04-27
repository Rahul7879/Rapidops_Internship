const http = require('node:http');
const {config} = require("./constants.js")
const Router = require('./utilities/Router.js');
const {generateRandomData} = require("./utilities/generate-random-data.js")
const router = new Router();
const PORT = config.PORT;

require('./routes/index.js')(router);
generateRandomData();

const server = http.createServer((req, res) => {
    router.handle(req, res);
});

server.listen(config.PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
