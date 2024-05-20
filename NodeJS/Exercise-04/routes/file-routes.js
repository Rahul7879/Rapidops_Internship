const {uploadFile, moveFile, deleteFile,getFile} = require('../controllers/file-controller.js');
const verifyUser = require('../middlewares/validate-user.js');

function setupRoutes(router) {
    router._post('/file', verifyUser, uploadFile );
    router._get('/file/:fileId', verifyUser, getFile);
    router._patch('/file/:fileId', verifyUser, moveFile );
    router._delete('/file/:fileId', verifyUser, deleteFile );
}

module.exports = setupRoutes;
