const {userActions} = require('../controllers');
const verifyUser = require('../middlewares/validate-user.js');

function setupRoutes(router) {
    router._post('/signup', userActions.signupControllerAction );
    router._post('/login', userActions.loginControllerAction);
    router._post('/login/:tenantId',verifyUser,userActions.loginInTenantAction)
}

module.exports = setupRoutes;