module.exports = function makeGetAllAssignedFolders(FolderDBCalls,Folder) {
    return async function getAllAssignedFolders (user){
        const { isAdmin, roleId, tenantId } = user;
        if (!isAdmin && !roleId) {
            throw { msg: 'Insufficient permissions to view assigned folders for this role', status: 403 };
        }
        let assignedFolders;
        if(isAdmin){
             assignedFolders = await FolderDBCalls.getAllFolders(tenantId)
        }else{
             assignedFolders = await FolderDBCalls.getAssignedFolders(roleId, tenantId);
        }
        if (!assignedFolders) {
            throw { msg: 'No assigned folders found for this role', status: 404 };
        }
        return assignedFolders;
    };
    
};
