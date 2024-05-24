module.exports = function makeAssignFoldersToRole(FolderDBCalls) {
    return async function assignFoldersToRole (folders,roleId, user){
        const { isAdmin, tenantId } = user;
        if (!isAdmin) {
            throw { msg: 'Insufficient permissions to assign folders to roles', status: 403 };
        }
    
        await FolderDBCalls.assignFoldersToRole(folders, roleId, tenantId);
    };
    
};