
const deleteFolder = async (folderId, user, folderGateway) => {
    const { tenantId, permissions, isAdmin, roleId } = user;
    if (!folderId) {
        throw { msg: 'Folder ID is required', status: 400 };
    }

    if (!checkPermission(permissions, 2, isAdmin)) { // 2 indicates the "delete" permission
        throw { msg: 'Insufficient permissions', status: 403 };
    }

    if (!isAdmin && !(await folderGateway.checkFolderAccess(folderId, roleId, tenantId))) {
        throw { msg: 'You do not have permission to delete this folder', status: 403 };
    }

    await folderGateway.deleteFolder(folderId, tenantId);
};

const checkPermission = (permissions, actionIndex, isAdmin) => {
    if (isAdmin) return true; // Admins have all permissions
    return permissions[actionIndex] === '1';
};

module.exports = deleteFolder