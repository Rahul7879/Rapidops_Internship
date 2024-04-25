const controllers = require('../controllers/product.controller.js');
const middlewares = require("../middlewares/user.middlewares.js")


function setupRoutes(router) {
    router._get('/product', middlewares.logMiddleware, controllers.getController);
    router._post('/product', middlewares.logMiddleware, middlewares.authMiddleware, controllers.postController);
    router._put('/product', middlewares.authMiddleware, controllers.deleteController);
    router._patch('/product', controllers.putController);
    router._delete('/product', controllers.patchController);
    router._get('/product/:name/:id', controllers.getController);
}

module.exports = setupRoutes;
