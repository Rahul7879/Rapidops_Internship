module.exports = function makeGetAllAssignedFolders(FolderDBCalls,Folder) {
    return async function getAllAssignedFolders (user){
        const { isAdmin, roleId, tenantId } = user;
        if (!isAdmin && !roleId) {
            throw { msg: 'Insufficient permissions to view assigned folders for this role', status: 403 };
        }
        let assignedFolders;
        if(isAdmin){
             assignedFolders = await FolderDBCalls.getAllFolders(tenantId)
             console.log({assignedFolders})
        }else{
             assignedFolders = await FolderDBCalls.getAssignedFolders(roleId, tenantId);
             console.log({assignedFolders})
        }
        if (!assignedFolders) {
            throw { msg: 'No assigned folders found for this role', status: 404 };
        }
        return assignedFolders;
    };
    
};
