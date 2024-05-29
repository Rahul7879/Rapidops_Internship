module.exports = function makeGetFile(FileDBCalls) {
    return async function moveFile (fileId, user){
        const { tenantId, permissions, isAdmin, roleId } = user;

        if (!fileId) {
            throw { msg: 'File ID is required', status: 400 };
        }
    
        if (!checkPermission(permissions, 2, isAdmin)) { // 2 indicates the "delete" permission
            throw { msg: 'Insufficient permissions', status: 403 };
        }
    
        if (!isAdmin && !(await FileDBCalls.checkFileAccess(fileId, roleId, tenantId))) {
            throw { msg: 'You do not have permission to delete this file', status: 403 };
        }
    
        await FileDBCalls.deleteFile(fileId);
    };
    
};


const checkPermission = (permissions, actionIndex, isAdmin) => {
    if (isAdmin) return true; // Admins have all permissions
    return permissions[actionIndex] === '1';
};
