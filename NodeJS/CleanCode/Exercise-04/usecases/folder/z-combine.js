const checkPermission = (permissions, actionIndex, isAdmin) => {
    if (isAdmin) return true; // Admins have all permissions
    return permissions[actionIndex] === '1';
};

const createFolder = async (data, user, folderGateway) => {
    const { folderName, parentFolder } = data;
    if (!folderName) {
        throw { msg: 'Folder name is required', status: 400 };
    }

    const { tenantId, permissions } = user;
    if (!checkPermission(permissions, 1, false)) { // 1 indicates the "create" permission
        throw { msg: 'Insufficient permissions to create folder', status: 403 };
    }

    if (parentFolder && !(await folderGateway.checkParentFolderExists(parentFolder, tenantId))) {
        throw { msg: 'Invalid parent folder ID', status: 400 };
    }

    await folderGateway.insertFolder(tenantId, parentFolder, folderName);
};

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

const moveFolder = async (folderId, newParentFolder, user, folderGateway) => {
    const { tenantId, permissions, isAdmin, roleId } = user;
    if (!folderId || !newParentFolder) {
        throw { msg: 'Folder ID and new parent folder ID are required', status: 400 };
    }

    if (!checkPermission(permissions, 3, isAdmin)) { // 3 indicates the "update" permission
        throw { msg: 'Insufficient permissions', status: 403 };
    }

    if (!isAdmin && !(await folderGateway.checkFolderAccess(folderId, roleId, tenantId))) {
        throw { msg: 'You do not have permission to move this folder', status: 403 };
    }

    await folderGateway.updateFolderParent(newParentFolder, folderId, tenantId);
};

const assignFoldersToRole = async (folders, roleId, user, folderGateway) => {
    const { isAdmin, tenantId } = user;
    if (!isAdmin) {
        throw { msg: 'Insufficient permissions to assign folders to roles', status: 403 };
    }

    await folderGateway.assignFoldersToRole(folders, roleId, tenantId);
};

const getAllAssignedFolders = async (user, folderGateway) => {
    const { isAdmin, roleId, tenantId } = user;
    if (!isAdmin && !roleId) {
        throw { msg: 'Insufficient permissions to view assigned folders for this role', status: 403 };
    }

    const assignedFolders = await folderGateway.getAssignedFolders(roleId, tenantId);
    if (!assignedFolders) {
        throw { msg: 'No assigned folders found for this role', status: 404 };
    }

    return assignedFolders;
};

module.exports = {
    createFolder,
    deleteFolder,
    moveFolder,
    assignFoldersToRole,
    getAllAssignedFolders,
};
