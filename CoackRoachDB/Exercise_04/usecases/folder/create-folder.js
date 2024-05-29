const {Folder} = require('../../entities');

module.exports = function makeCreateFolder(FolderDBCalls) {
    return async function createFolder (data, user){
        const folder = Folder.validate(data);

        const { tenantId, permissions } = user;
        if (!checkPermission(permissions, 1, false)) { // 1 indicates the "create" permission
            throw { msg: 'Insufficient permissions to create folder', status: 403 };
        }
    
        if (folder.parentFolder && !(await FolderDBCalls.checkParentFolderExists(folder.parentFolder, tenantId))) {
            throw { msg: 'Invalid parent folder ID', status: 400 };
        }
   
        await FolderDBCalls.insertFolder(tenantId, folder.parentFolder, folder.folderName);
    };
    
};



const checkPermission = (permissions, actionIndex, isAdmin) => {
    if (isAdmin) return true; // Admins have all permissions
    return permissions[actionIndex] === '1';
};
