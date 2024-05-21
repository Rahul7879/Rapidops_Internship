const getAllAssignedFolders = async (user, folderGateway) => {
    const { isAdmin, roleId, tenantId } = user;
    if (!isAdmin && !roleId) {
        throw { msg: 'Insufficient permissions to view assigned folders for this role', status: 403 };
    }

    const assignedFolders = await folderGateway.getAssignedFolders(roleId, tenantId);
    if (!assignedFolders) {
        throw { msg: 'No assigned folders found for this role', status: 404 };
    }
}

module.exports = getAllAssignedFolders