const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

async function loginUserInTenant(params, user, roleGateway) {
    const { tenantId } = params;
    const { email, userId } = user;
    
    const userRole = await roleGateway.checkUserAccess(userId, +tenantId);

    if (!userRole) {
        throw { msg: 'User does not have access to this tenant', status: 403 };
    }

    const token = jwt.sign({
        userId: userId,
        email: email,
        tenantId: +tenantId,
        permissions: userRole.permissions,
        isAdmin: userRole.isAdmin,
        roleId: userRole.roleId
    }, SECRET_KEY, { expiresIn: '1h' });

    return { token, tenantId: +tenantId };
}

module.exports = loginUserInTenant;
