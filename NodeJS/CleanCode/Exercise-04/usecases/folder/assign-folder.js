const assignFoldersToRole = async (folders, roleId, user, folderGateway) => {
    const { isAdmin, tenantId } = user;
    if (!isAdmin) {
        throw { msg: 'Insufficient permissions to assign folders to roles', status: 403 };
    }

    await folderGateway.assignFoldersToRole(folders, roleId, tenantId);
};

module.exports = assignFoldersToRole
