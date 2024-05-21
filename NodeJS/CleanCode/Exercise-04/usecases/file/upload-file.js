const File = require('../../entities/file');
const path = require('path');

const uploadFile = async (files, body, user, fileGateway) => {
    if (!files || !files.file) {
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

    const newFilename = File.generateNewFilename(files.file[0].originalFilename);
    const newPath = path.join('uploads', newFilename);

    const file = File.validate({
        folderId,
        originalFilename: files.file[0].originalFilename,
        filepath: files.file[0].filepath,
        newFilename,
        newPath
    });

    fileGateway.renameFile(file.filepath, file.newPath);
    await fileGateway.insertFile(file.folderId, file.originalFilename, file.newPath);
};

const checkPermission = (permissions, actionIndex, isAdmin) => {
    if (isAdmin) return true; // Admins have all permissions
    return permissions[actionIndex] === '1';
};

module.exports = uploadFile;
