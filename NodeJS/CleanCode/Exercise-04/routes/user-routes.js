const {signupController,loginController,loginInTenant} = require('../controllers/user/index.js');
const verifyUser = require('../middlewares/validate-user.js');

function setupRoutes(router) {
    router._post('/signup', signupController );
    router._post('/login', loginController);
    router._post('/login/:tenantId',verifyUser,loginInTenant)
}

module.exports = setupRoutes;



// MVC 


// const {signupUser,loginUser,loginInTenant} = require('../controllers/user-controller.js');
// const verifyUser = require('../middlewares/validate-user.js');

// function setupRoutes(router) {
//     router._post('/signup', signupUser );
//     router._post('/login', loginUser);
//     router._post('/login/:tenantId',verifyUser,loginInTenant)
// }

// module.exports = setupRoutes;
