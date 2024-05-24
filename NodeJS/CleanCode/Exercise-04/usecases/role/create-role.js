const {Role} = require('../../entities');

module.exports = function makeCreateRole(RoleDBCalls) {
    return async function createRole (data, user){
        const role = Role.validate(data);

        const tenantId = await RoleDBCalls.getTenantIdByEmail(user.email);
        if (!tenantId) {
            throw { msg: 'No tenant ID found for user', status: 400 };
        }
    
        if (await RoleDBCalls.checkRoleExists(tenantId, role.roleName)) {
            throw { msg: `Role already exists in tenant ${tenantId}`, status: 409 };
        }
        await RoleDBCalls.createRole(tenantId, role.permissions, role.roleName);
    };
    
};
