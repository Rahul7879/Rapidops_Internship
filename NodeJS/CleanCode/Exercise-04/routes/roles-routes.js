const {createRole,inviteRole,acceptRequest} = require('../controllers/role/index.js');
const verifyUser = require('../middlewares/validate-user.js');

function setupRoutes(router) {
    router._post('/tenant/:tenant_id/role',verifyUser, createRole );
    router._post('/tenant/:tenant_id/invite',verifyUser,inviteRole);
    router._get('/invite/:id/:token',acceptRequest);
}

module.exports = setupRoutes;
