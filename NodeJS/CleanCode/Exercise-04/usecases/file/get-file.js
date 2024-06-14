module.exports = function makeGetFile(FileDBCalls) {
    return async function getFile(fileId, user) {
        const { tenantId, permissions, isAdmin, roleId } = user;
      
        if (!fileId) {
            throw { msg: 'File ID is required', status: 400 };
        }

        if (!checkPermission(permissions, 0, isAdmin)) { // 0 indicates the "read" permission
            throw { msg: 'Insufficient permissions', status: 403 };
        }

        const fileDetails = await FileDBCalls.getFileDetails(fileId);

        if (!fileDetails) {
            throw { msg: 'File not found', status: 404 };
        }

        if (!isAdmin && !(await FileDBCalls.checkFileAccess(fileId, roleId, tenantId))) {
            throw { msg: 'You do not have permission to access this file', status: 403 };
        }

        const filePath = fileDetails.file_path;

        if (!FileDBCalls.checkFileExists(filePath)) {
            throw { msg: 'File not found on server', status: 404 };
        }

        return { filePath, fileDetails };
    };
};

const checkPermission = (permissions, actionIndex, isAdmin) => {
    if (isAdmin) return true; // Admins have all permissions
    return permissions[actionIndex] === '1';
};
