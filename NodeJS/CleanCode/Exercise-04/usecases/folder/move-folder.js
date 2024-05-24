module.exports = function makeMoveFolder(FolderDBCalls) {
    return async function moveFolder (folderId, newParentFolder, user){
        const { tenantId, permissions, isAdmin, roleId } = user;
        if (!folderId || !newParentFolder) {
            throw { msg: 'Folder ID and new parent folder ID are required', status: 400 };
        }
    
        if (!checkPermission(permissions, 3, isAdmin)) { // 3 indicates the "update" permission
            throw { msg: 'Insufficient permissions', status: 403 };
        }
    
        if (!isAdmin && !(await FolderDBCalls.checkFolderAccess(folderId, roleId, tenantId))) {
            throw { msg: 'You do not have permission to move this folder', status: 403 };
        }
    
        await FolderDBCalls.updateFolderParent(newParentFolder, folderId, tenantId);
    };
    
};

const checkPermission = (permissions, actionIndex, isAdmin) => {
    if (isAdmin) return true; // Admins have all permissions
    return permissions[actionIndex] === '1';
};
