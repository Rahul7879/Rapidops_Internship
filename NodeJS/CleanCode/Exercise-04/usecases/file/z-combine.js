const path = require('path');

const checkPermission = (permissions, actionIndex, isAdmin) => {
    if (isAdmin) return true; // Admins have all permissions
    return permissions[actionIndex] === '1';
};

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

const deleteFile = async (fileId, user, fileGateway) => {
    const { tenantId, permissions, isAdmin, roleId } = user;

    if (!fileId) {
        throw { msg: 'File ID is required', status: 400 };
    }

    if (!checkPermission(permissions, 2, isAdmin)) { // 2 indicates the "delete" permission
        throw { msg: 'Insufficient permissions', status: 403 };
    }

    if (!isAdmin && !(await fileGateway.checkFileAccess(fileId, roleId, tenantId))) {
        throw { msg: 'You do not have permission to delete this file', status: 403 };
    }

    await fileGateway.deleteFile(fileId);
};

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

const getFile = async (fileId, user, fileGateway) => {
    const { tenantId, permissions, isAdmin, roleId } = user;

    if (!fileId) {
        throw { msg: 'File ID is required', status: 400 };
    }

    if (!checkPermission(permissions, 0, isAdmin)) { // 0 indicates the "read" permission
        throw { msg: 'Insufficient permissions', status: 403 };
    }

    const fileDetails = await fileGateway.getFileDetails(fileId);

    if (!fileDetails) {
        throw { msg: 'File not found', status: 404 };
    }

    if (!isAdmin && !(await fileGateway.checkFileAccess(fileId, roleId, tenantId))) {
        throw { msg: 'You do not have permission to access this file', status: 403 };
    }

    const filePath = fileDetails.file_path;

    if (!fileGateway.checkFileExists(filePath)) {
        throw { msg: 'File not found on server', status: 404 };
    }

    return { filePath, fileDetails };
};

module.exports = {
    uploadFile,
    deleteFile,
    moveFile,
    getFile,
};
