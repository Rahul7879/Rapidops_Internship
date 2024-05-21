const Folder = require('../../entities/folder');

const createFolder = async (data, user, folderGateway) => {
    const folder = Folder.validate(data);

    const { tenantId, permissions } = user;
    if (!checkPermission(permissions, 1, false)) { // 1 indicates the "create" permission
        throw { msg: 'Insufficient permissions to create folder', status: 403 };
    }

    if (folder.parentFolder && !(await folderGateway.checkParentFolderExists(folder.parentFolder, tenantId))) {
        throw { msg: 'Invalid parent folder ID', status: 400 };
    }

    await folderGateway.insertFolder(tenantId, folder.parentFolder, folder.folderName);
};

const checkPermission = (permissions, actionIndex, isAdmin) => {
    if (isAdmin) return true; // Admins have all permissions
    return permissions[actionIndex] === '1';
};

module.exports = createFolder;
