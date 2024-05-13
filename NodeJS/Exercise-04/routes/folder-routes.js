const {createFolder,getAllFolders,assignFoldersToRole,getAllAssignedFolders, deleteFolder,moveFolder} = require('../controllers/folder-controller.js');
const verifyUser = require('../middlewares/validate-user.js');

function setupRoutes(router) {
    router._post('/folder', verifyUser, createFolder );
    router._get('/tenant/:tenant_id',verifyUser,getAllFolders)
    router._post('/tenant/:tenant_id/:role_id',verifyUser,assignFoldersToRole)
    router._post('/tenant/:tenant_id/:role_id/assigned-folders',verifyUser,getAllAssignedFolders)
    router._delete('/folder/:folder_id',verifyUser,deleteFolder)
    router._patch('/folder/:folder_id',verifyUser,moveFolder)
}

module.exports = setupRoutes;
