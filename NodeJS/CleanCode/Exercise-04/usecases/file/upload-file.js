const path = require('path');

const uploadFile = async (files, body, user, fileGateway) => {
    if (!files) {
        throw { msg: 'No file uploaded', status: 400 };
    }

    const { formfolder } = body;
    const folderId = +formfolder[0];

    if (!folderId) {
        fileGateway.deleteFileFromFileSystem(files.file[0].path);
        throw { msg: 'Folder ID is required', status: 400 };
    }

    const { tenantId, permissions, isAdmin } = user;

    if (!checkPermission(permissions, 1, isAdmin)) { // 1 indicates the "create" permission
        fileGateway.deleteFileFromFileSystem(files.file[0].path);
        throw { msg: 'Insufficient permissions', status: 403 };
    }

    const newFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}${path.extname(files.file[0].originalFilename)}`;
    const newPath = path.join('uploads', newFileName);

    fileGateway.renameFile(files.file[0].filepath, newPath);
    await fileGateway.insertFile(folderId, files.file[0].originalFilename, newPath);
};

const checkPermission = (permissions, actionIndex, isAdmin) => {
    if (isAdmin) return true; // Admins have all permissions
    return permissions[actionIndex] === '1';
};

module.exports = uploadFile