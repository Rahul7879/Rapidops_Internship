const {getAllUsers,deleteController,patchController,putController,addUser} = require('../controllers/user.controller.js');
const {logMiddleware,authMiddleware} = require("../middlewares/product.middlewares.js")


function setupRoutes(router) {
    router._get('/users', getAllUsers);
    router._get('/user/:id', getAllUsers);
    router._post('/user', addUser);
    router._put('/user/:id', authMiddleware, putController);
    router._patch('/user/:id', patchController);
    router._delete('/user/:id', deleteController);
}

module.exports = setupRoutes;
