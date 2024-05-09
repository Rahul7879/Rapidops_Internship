const {getAllUsers,deleteController,patchController,putController,addUser} = require('../controllers/user-controller.js');
const {logMiddleware,authMiddleware} = require("../middlewares/user.middlewares.js")


function setupRoutes(router) {
    router._post('/user', );
    router._get('/user/:id', getAllUsers);
    router._post('/folder', addUser);
    router._get('/folder/:id', authMiddleware, putController);
    router._get('/file/:id', patchController);
    router._post('/file', deleteController);
}

module.exports = setupRoutes;
