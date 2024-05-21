// const {createTenant} = require('../controllers/organization/index.js');
const createOrganizationController = require('../controllers/organization/index.js');
const verifyUser = require('../middlewares/validate-user.js');

function setupRoutes(router) {
    router._post('/tenant', verifyUser, createOrganizationController);
}

module.exports = setupRoutes;
