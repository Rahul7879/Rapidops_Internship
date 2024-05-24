const {File} = require('../../entities');

module.exports = function makeUploadFile(FileDBCalls,path){
   return async (files, body, user) => {
    if (!files || !files.file) {
        throw { msg: 'No file uploaded', status: 400 };
    }

    const { formfolder } = body;
    const folderId = +formfolder[0];

    if (!folderId) {
        FileDBCalls.deleteFileFromFileSystem(files.file[0].path);
        throw { msg: 'Folder ID is required', status: 400 };
    }

    const { tenantId, permissions, isAdmin } = user;

    if (!checkPermission(permissions, 1, isAdmin)) { // 1 indicates the "create" permission
        FileDBCalls.deleteFileFromFileSystem(files.file[0].path);
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


    FileDBCalls.renameFile(file.filepath, file.newPath);
    await FileDBCalls.insertFile(file.folderId, file.originalFilename, file.newPath);
};
}



const checkPermission = (permissions, actionIndex, isAdmin) => {
    if (isAdmin) return true; // Admins have all permissions
    return permissions[actionIndex] === '1';
};
