const {createFolder,getAllFolders,assignFoldersToRole,getAllAssignedFolders, deleteFolder,moveFolder} = require('../controllers/folder/index.js');
const verifyUser = require('../middlewares/validate-user.js');

function setupRoutes(router) {
    router._post('/folder', verifyUser, createFolder );
    router._get('/tenant/:tenant_id',verifyUser,getAllFolders)
    router._post('/tenant/assign/:roleId',verifyUser,assignFoldersToRole)
    router._post('/tenant/:tenant_id/:role_id/assigned-folders',verifyUser,getAllAssignedFolders)
    router._delete('/folder/:folderId',verifyUser,deleteFolder)
    router._patch('/folder/:folderId',verifyUser,moveFolder)
}

module.exports = setupRoutes;

