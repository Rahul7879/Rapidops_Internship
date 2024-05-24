const {folderActions} = require('../controllers');
const verifyUser = require('../middlewares/validate-user.js');


function setupRoutes(router) {
    router._post('/folder', verifyUser, folderActions.createFolderAction );
    router._get('/tenant/:tenant_id',verifyUser,folderActions.getAllFolders)
    router._post('/tenant/assign/:roleId',verifyUser,folderActions.assignFoldersToRoleAction)
    router._post('/tenant/:tenant_id/:role_id/assigned-folders',verifyUser,folderActions.getAllAssignedFoldersAction)
    router._delete('/folder/:folderId',verifyUser,folderActions.deleteFolderAction)
    router._patch('/folder/:folderId',verifyUser,folderActions.moveFolderAction)
    router._get('/folder/:folderId/contents',verifyUser,folderActions.getFolderContentAction)
}

module.exports = setupRoutes;

