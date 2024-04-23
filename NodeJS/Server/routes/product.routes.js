const controllers = require('../controllers/product.controller.js');
const middlewares = require("../middlewares/user.middlewares.js")


function setupRoutes(router) {
    router.add('GET', '/product', middlewares.logMiddleware, controllers.getController);
    router.add('POST', '/product', middlewares.logMiddleware, middlewares.authMiddleware, controllers.postController);
    router.add('DELETE', '/product', middlewares.authMiddleware, controllers.deleteController);
    router.add('PUT', '/product', controllers.putController);
    router.add('PATCH', '/product', controllers.patchController);
    router.add('GET', '/product/:id', controllers.getController);
}

module.exports = setupRoutes;
