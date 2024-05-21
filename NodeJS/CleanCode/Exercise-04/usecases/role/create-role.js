const createRole = async (data, user, roleGateway) => {
    const { isReadable, isWritable, isDeletable, isEditable, roleName } = data;
    const permissions = `${isReadable ? '1' : '0'}${isWritable ? '1' : '0'}${isDeletable ? '1' : '0'}${isEditable ? '1' : '0'}`;
    const tenantId = await roleGateway.getTenantIdByEmail(user.email);

    if (!tenantId) {
        throw { msg: 'No tenant ID found for user', status: 400 };
    }

    if (await roleGateway.checkRoleExists(tenantId, roleName)) {
        throw { msg: `Role already exists in tenant ${tenantId}`, status: 409 };
    }

    await roleGateway.createRole(tenantId, permissions, roleName);
};

module.exports = createRole