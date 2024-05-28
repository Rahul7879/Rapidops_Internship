module.exports = function makeLoginUser(UserDBCalls,jwt,SECRET_KEY) {
    return async function loginUserInTenant(params, user){
        const { tenantId } = params;
        const { email, userId } = user;
        
        const userRole = await UserDBCalls.checkUserAccess(userId, +tenantId);
    
        if (!userRole) {
            throw { msg: 'User does not have access to this tenant', status: 403 };
        }
    
        const token = jwt.sign({
            userId: userId,
            email: email,
            tenantId: +tenantId,
            permissions: userRole.permissions,
            isAdmin: userRole.isAdmin,
            roleId: userRole.roleId,
            isTempUser:userRole.isTempUser || false,
            tempUserExpiry: userRole.tempUserExpiry || null
        }, SECRET_KEY, { expiresIn: '1h' });
    
        return { token, tenantId: +tenantId };
    };
    
};
