const {userActions} = require('../controllers');
const verifyUser = require('../middlewares/validate-user.js');

function setupRoutes(router) {
    router._post('/signup', userActions.signupControllerAction );
    router._post('/login', userActions.loginControllerAction);
    router._post('/login/:tenantId',verifyUser,userActions.loginInTenantAction)
    router._post('/forget-password',userActions.forgetPasswordAction)
    router._post('/reset-password',userActions.resetPasswordAction)
}

module.exports = setupRoutes;