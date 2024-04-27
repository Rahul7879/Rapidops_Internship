const {random1000Data, getUserById,getFixedData} = require('../controllers/api-controller.js');

function setupRoutes(router) {
    router._get('/data/all', random1000Data);
    router._get('/data/_id/:id', getUserById);
    router._get('/data/fixed', getFixedData);
}

module.exports = setupRoutes;
