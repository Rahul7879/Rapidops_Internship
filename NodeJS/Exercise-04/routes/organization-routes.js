const {createTenant} = require('../controllers/organization-controller.js');
const verifyUser = require('../middlewares/validate-user.js');

function setupRoutes(router) {
    router._post('/tenant', verifyUser, createTenant);
}

module.exports = setupRoutes;
