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

const checkPermission = (permissions, actionIndex, isAdmin) => {
    if (isAdmin) return true; // Admins have all permissions
    return permissions[actionIndex] === '1';
};


module.exports = createFolder