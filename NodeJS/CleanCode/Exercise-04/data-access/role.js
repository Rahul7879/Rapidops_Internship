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


const createRole = async (tenantId, permissions, roleName) => {
    const query = 'INSERT INTO roles (tenant_id, permissions, role_name) VALUES (?, ?, ?)';
    await pool.query(query, [tenantId, permissions, roleName]);
};

const getTenantIdByEmail = async (email) => {
    const query = 'SELECT my_tenant FROM users WHERE email = ?';
    const [user] = await pool.query(query, [email]);
    return user[0]?.my_tenant || null;
};

const checkRoleExists = async (tenantId, roleName) => {
    const query = 'SELECT COUNT(*) AS count FROM roles WHERE tenant_id = ? AND role_name = ?';
    const [result] = await pool.query(query, [tenantId, roleName]);
    return result[0].count > 0;
};

const getUserByEmail = async (email) => {
    const query = 'SELECT user_id, my_tenant FROM users WHERE email = ?';
    const [user] = await pool.query(query, [email]);
    return user[0] || null;
};

const getUserById = async (userId) => {
    const query = 'SELECT user_id, added_in FROM users WHERE user_id = ?';
    const [user] = await pool.query(query, [userId]);
    return user[0] || null;
};

const insertUser = async (email, addedIn) => {
    const query = 'INSERT INTO users (email, added_in) VALUES (?, ?)';
    const [result] = await pool.query(query, [email, JSON.stringify([addedIn])]);
    return result.insertId;
};

const updateAddedIn = async (addedIn, userId) => {
    const query = 'UPDATE users SET added_in = ? WHERE user_id = ?';
    await pool.query(query, [JSON.stringify(addedIn), userId]);
};

const updateRoleUser = async (userId, roleId) => {
    const query = 'UPDATE roles SET user_id = ?, status = ? WHERE role_id = ? AND user_id IS NULL';
    const [result] = await pool.query(query, [userId, 'active', roleId]);
    return result.affectedRows;
};

const updateRoleWithTempUser = async (tempUserId, tempUserExpiry, roleId, tenantId) => {
    console.log(tempUserId, tempUserExpiry, roleId, tenantId,"Comon")
    const query = `
        UPDATE roles 
        SET temp_user = ?, temp_user_expiry = ? 
        WHERE role_id = ? AND tenant_id = ?`;

    await pool.query(query, [tempUserId, tempUserExpiry, roleId, tenantId]);
};

async function getTempUserId(tempUserEmail, tenantId) {
    let [user] = await pool.query('SELECT user_id FROM users WHERE email = ?', [tempUserEmail]);
    let tempUserId;
    console.log(user,"not",tempUserEmail,tenantId)

    if (user.length === 0) {
        const result = await pool.query('INSERT INTO users (email,added_in) VALUES (?, ?)', [tempUserEmail, JSON.stringify[tenantId]]);
        console.log(result,"____")
        tempUserId = result[0].insertId; 
    } else {
        tempUserId = user[0].user_id;
    }

    return tempUserId;
}


module.exports = {
    createRole,
    getTenantIdByEmail,
    checkRoleExists,
    getUserByEmail,
    getUserById,
    insertUser,
    updateAddedIn,
    updateRoleUser,
    checkUserAccess,
    updateRoleWithTempUser,
    getTempUserId
};

