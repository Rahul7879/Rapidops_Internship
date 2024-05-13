const {signupUser,loginUser} = require('../controllers/user-controller.js');

function setupRoutes(router) {
    router._post('/signup', signupUser );
    router._post('/login', loginUser);  
}

module.exports = setupRoutes;
