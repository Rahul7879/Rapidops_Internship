const {tenantActions} = require('../controllers');
const verifyUser = require('../middlewares/validate-user.js');

function setupRoutes(router) {
    router._post('/tenant', verifyUser, tenantActions.createTenantAction);
}

module.exports = setupRoutes;
