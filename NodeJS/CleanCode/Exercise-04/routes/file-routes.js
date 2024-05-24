const {fileActions} = require('../controllers');
const verifyUser = require('../middlewares/validate-user.js');

function setupRoutes(router) {
    router._post('/file', verifyUser, fileActions.uploadFileAction );
    router._get('/file/:fileId', verifyUser, fileActions.getFileAction);
    router._patch('/file/:fileId', verifyUser, fileActions.moveFileAction );
    router._delete('/file/:fileId', verifyUser, fileActions.deleteFileAction );
}

module.exports = setupRoutes;

