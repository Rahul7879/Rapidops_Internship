const {roleActions} = require('../controllers');
const verifyUser = require('../middlewares/validate-user.js');

function setupRoutes(router) {
    router._post('/tenant/:tenant_id/role',verifyUser, roleActions.createRoleAction );
    router._post('/tenant/:tenant_id/invite',verifyUser,roleActions.inviteRoleAction);
    router._get('/invite/:id/:token',roleActions.acceptRequestAction);
}

module.exports = setupRoutes;
