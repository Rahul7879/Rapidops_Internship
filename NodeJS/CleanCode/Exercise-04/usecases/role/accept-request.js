module.exports = function makeAcceptRole(RoleDBCalls,jwt) {
    return async function acceptRole (token){
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded.role_id || !decoded.user_id) {
        throw { msg: 'Invalid token', status: 401 };
    }

    const affectedRows = await RoleDBCalls.updateRoleUser(decoded.user_id, decoded.role_id);

    if (affectedRows === 0) {
        throw { msg: 'Role update failed or role already assigned', status: 400 };
    }
    };
};

