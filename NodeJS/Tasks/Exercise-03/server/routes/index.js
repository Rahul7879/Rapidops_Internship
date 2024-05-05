const {loginUser, signupUser,getProfileData} = require('../controllers/api-controller.js');
const verifyUser = require('../middleware/validate-user.js');
const {forgetPassword,getResetPassword,postResetPassword} = require("../controllers/forget-password.js");
const { AuthToCallback, getAuthUrlFunction } = require('../controllers/google-auth.js');

function setupRoutes(router) {
    router._post('/login', loginUser);
    router._post('/signup', signupUser);
    router._post('/profile',verifyUser, getProfileData);
    router._post('/forgot-password',forgetPassword);
    router._post('/reset-password/:id/:token',postResetPassword)
    router._get('/reset-password/:id/:token',getResetPassword)
    router._get('/oauth2callback',AuthToCallback)
    router._get('/get-auth-url',getAuthUrlFunction)

}

module.exports = setupRoutes;
