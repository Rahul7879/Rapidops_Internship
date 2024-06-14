
module.exports = function makeGetFolderContents(FolderDBCalls) {
    return async function getFolderContents(folderId, user, page, pageSize) {
        const { tenantId, permissions, isAdmin, roleId } = user;

        if (!folderId) {
            throw { msg: 'Folder ID is required', status: 400 };
        }

        if (!checkPermission(permissions, 1, isAdmin)) { // Assuming '1' indicates read permission
            throw { msg: 'Insufficient permissions', status: 403 };
        }

        if (!isAdmin && !(await FolderDBCalls.checkFolderAccess(folderId, roleId, tenantId))) {
            throw { msg: 'You do not have permission to access this folder', status: 403 };
        }

        const limit = parseInt(pageSize, 10);
        const offset = (parseInt(page, 10) - 1) * limit;

        const [folders, files, totalFolders, totalFiles] = await Promise.all([
            FolderDBCalls.getFoldersByParentId(folderId, limit, offset),
            FolderDBCalls.getFilesByFolderId(folderId, limit, offset),
            FolderDBCalls.countFoldersByParentId(folderId),
            FolderDBCalls.countFilesByFolderId(folderId),
        ]);

        const totalItems = totalFolders + totalFiles;
        const totalPages = Math.ceil(totalItems / limit);

        return {
            folders,
            files,
            totalItems,
            totalPages,
            currentPage: page,
            pageSize: limit,
        };
    };
};

const checkPermission = (permissions, actionIndex, isAdmin) => {
    if (isAdmin) return true; // Admins have all permissions
    return permissions[actionIndex] === '1';
};
