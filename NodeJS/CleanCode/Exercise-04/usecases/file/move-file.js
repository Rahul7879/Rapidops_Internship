const moveFile = async (fileId, newFolderId, user, fileGateway) => {
    const { tenantId, permissions, isAdmin, roleId } = user;

    if (!fileId || !newFolderId) {
        throw { msg: 'File ID and new folder ID are required', status: 400 };
    }

    if (!checkPermission(permissions, 3, isAdmin)) { // 3 indicates the "update" permission
        throw { msg: 'Insufficient permissions', status: 403 };
    }

    if (!isAdmin && !(await fileGateway.checkFileAccess(fileId, roleId, tenantId))) {
        throw { msg: 'You do not have permission to move this file', status: 403 };
    }

    await fileGateway.updateFileFolder(fileId, newFolderId);
};


const checkPermission = (permissions, actionIndex, isAdmin) => {
    if (isAdmin) return true; // Admins have all permissions
    return permissions[actionIndex] === '1';
};

module.exports = moveFile