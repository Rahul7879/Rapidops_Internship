const {createTenant} = require('../controllers/organization/index.js');
const verifyUser = require('../middlewares/validate-user.js');

function setupRoutes(router) {
    router._post('/tenant', verifyUser, createTenant);
}

module.exports = setupRoutes;
