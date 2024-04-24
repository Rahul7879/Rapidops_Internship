const controllers = require('../controllers/user.controller.js');
const middlewares = require("../middlewares/product.middlewares.js")


function setupRoutes(router) {
    router._get('/user', middlewares.logMiddleware, controllers.getController);
    router._post('/user2', middlewares.logMiddleware, middlewares.authMiddleware, controllers.postController);
    router._put('/user', middlewares.authMiddleware, controllers.deleteController);
    router._patch('/user', controllers.putController);
    router._delete('/user', controllers.patchController);
    router._get('/user/:id', controllers.getController);
}

module.exports = setupRoutes;
