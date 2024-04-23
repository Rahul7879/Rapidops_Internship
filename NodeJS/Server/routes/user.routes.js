const controllers = require('../controllers/user.controller.js');
const middlewares = require("../middlewares/product.middlewares.js")


function setupRoutes(router) {
    router.add('GET', '/user', middlewares.logMiddleware, controllers.getController);
    router.add('POST', '/user', middlewares.logMiddleware, middlewares.authMiddleware, controllers.postController);
    router.add('DELETE', '/user', middlewares.authMiddleware, controllers.deleteController);
    router.add('PUT', '/user', controllers.putController);
    router.add('PATCH', '/user', controllers.patchController);
    router.add('GET', '/user/:id', controllers.patchController);
}

module.exports = setupRoutes;
