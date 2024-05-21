const Role = require('../../entities/roles.js');

const createRole = async (data, user, roleGateway) => {
    const role = Role.validate(data);

    const tenantId = await roleGateway.getTenantIdByEmail(user.email);
    if (!tenantId) {
        throw { msg: 'No tenant ID found for user', status: 400 };
    }

    if (await roleGateway.checkRoleExists(tenantId, role.roleName)) {
        throw { msg: `Role already exists in tenant ${tenantId}`, status: 409 };
    }

    await roleGateway.createRole(tenantId, role.permissions, role.roleName);
};

module.exports = createRole;
