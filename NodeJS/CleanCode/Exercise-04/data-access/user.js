const pool = require('../db/conn');

// const checkUserAccess = async (userId, tenantId)=> {
//     const query = 'SELECT role_id, permissions, role_name FROM roles WHERE user_id = ? AND tenant_id = ? LIMIT 1';
//     const [users] = await pool.query(query, [userId, tenantId]);
    
//     if (users.length === 0) {
//         throw { msg: 'User does not have access to this tenant', status: 403 };
//     }
    
//     const user = users[0];

//     return {
//         userId: userId,
//         permissions: user.permissions,
//         isAdmin: user.role_name === "admin",
//         roleId: user.role_id
//     };
// }

const checkUserAccess = async (userId, tenantId) => {
    let query = 'SELECT role_id, permissions, role_name FROM roles WHERE user_id = ? AND tenant_id = ? LIMIT 1';
    let [users] = await pool.query(query, [userId, tenantId]);
    console.log("cimin",users)
    if (users.length === 0) {
        // Check for temporary user access
        query = 'SELECT role_id, permissions, role_name, temp_user_expiry FROM roles WHERE temp_user = ? AND tenant_id = ? LIMIT 1';
        [users] = await pool.query(query, [userId, tenantId]);

        if (users.length === 0) {
            throw { msg: 'User does not have access to this tenant', status: 403 };
        }

        const user = users[0];
        const now = new Date();

        console.log(user,"time",new Date(user.temp_user_expiry))

        if (new Date(user.temp_user_expiry) <= now) {
            // Temporary role has expired
            throw { msg: 'Temporary access has expired', status: 403 };
        }
        
        return {
            userId: userId,
            permissions: user.permissions,
            isAdmin: user.role_name === "admin",
            roleId: user.role_id,
            tempUserExpiry: new Date(user.temp_user_expiry),
            isTempUser:true
        };
    }

    const user = users[0];

    return {
        userId: userId,
        permissions: user.permissions,
        isAdmin: user.role_name === "admin",
        roleId: user.role_id
    };
};



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

const getTenantAdminEmail = async (tenantId) => {
    const query = `
        SELECT u.email 
        FROM users u 
        JOIN roles r ON u.user_id = r.user_id 
        WHERE r.role_name = 'admin' AND u.my_tenant = ? 
        LIMIT 1`;

    const [result] = await pool.query(query, [tenantId]);

    if (result.length === 0) {
        return null;
    }

    return result[0].email;
};


module.exports = {
    createUser,
    findUserByEmail,
    checkUserAccess,
    updateUserPassword,
    getTenantAdminEmail
};
