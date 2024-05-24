const pool = require('../db/conn');

const checkUserAccess = async (userId, tenantId)=> {
    const query = 'SELECT role_id, permissions, role_name FROM roles WHERE user_id = ? AND tenant_id = ? LIMIT 1';
    const [users] = await pool.query(query, [userId, tenantId]);
    
    if (users.length === 0) {
        throw { msg: 'User does not have access to this tenant', status: 403 };
    }
    
    const user = users[0];

    return {
        userId: userId,
        permissions: user.permissions,
        isAdmin: user.role_name === "admin",
        roleId: user.role_id
    };
}


const createUser = async (email, password, fullName) => {
    const query = 'INSERT INTO users (email, password, name) VALUES (?,?,?)';
    await pool.execute(query, [email, password, fullName]);
};

const findUserByEmail = async (email) => {
    const query = 'SELECT email, password, my_tenant, added_in, user_id FROM users WHERE email = ? LIMIT 1';
    const [users] = await pool.query(query, [email]);
    return users.length ? users[0] : null;
};

const updateUserPassword = async (email, newPassword) => {
    await pool.query('UPDATE users SET password = ? WHERE email = ?', [newPassword, email]);
}

module.exports = {
    createUser,
    findUserByEmail,
    checkUserAccess,
    updateUserPassword
};
