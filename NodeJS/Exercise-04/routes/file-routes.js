const {uploadFile, moveFile, deleteFile} = require('../controllers/file-controller.js');
const verifyUser = require('../middlewares/validate-user.js');

function setupRoutes(router) {
    router._post('/file', verifyUser, uploadFile );
    router._patch('/file/:fileId/:newFolderId', verifyUser, moveFile );
    router._delete('/file/:file_id', verifyUser, deleteFile );
}

module.exports = setupRoutes;
