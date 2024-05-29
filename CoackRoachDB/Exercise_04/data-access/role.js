const pool = require('../db/conn');

const checkUserAccess = async (userId, tenantId) => {
    try {
        const query = 'SELECT role_id, permissions, role_name FROM roles WHERE user_id = $1 AND tenant_id = $2 LIMIT 1';
        const { rows: users } = await pool.query(query, [userId, tenantId]);
        
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
    } catch (error) {
        throw error;
    }
};

const createRole = async (tenantId, permissions, roleName) => {
    try {
        const query = 'INSERT INTO roles (tenant_id, permissions, role_name) VALUES ($1, $2, $3)';
        await pool.query(query, [tenantId, permissions, roleName]);
    } catch (error) {
        throw error;
    }
};

const getTenantIdByEmail = async (email) => {
    try {
        const query = 'SELECT my_tenant FROM users WHERE email = $1';
        const { rows: user } = await pool.query(query, [email]);
        return user[0]?.my_tenant || null;
    } catch (error) {
        throw error;
    }
};

const checkRoleExists = async (tenantId, roleName) => {
    try {
        const query = 'SELECT COUNT(*) AS count FROM roles WHERE tenant_id = $1 AND role_name = $2';
        const { rows: result } = await pool.query(query, [tenantId, roleName]);
        return result[0].count > 0;
    } catch (error) {
        throw error;
    }
};

const getUserByEmail = async (email) => {
    try {
        const query = 'SELECT user_id, my_tenant FROM users WHERE email = $1';
        const { rows: user } = await pool.query(query, [email]);
        return user[0] || null;
    } catch (error) {
        throw error;
    }
};

const getUserById = async (userId) => {
    try {
        const query = 'SELECT user_id, added_in FROM users WHERE user_id = $1';
        const { rows: user } = await pool.query(query, [userId]);
        return user[0] || null;
    } catch (error) {
        throw error;
    }
};

const insertUser = async (email, addedIn) => {
    try {
        const query = 'INSERT INTO users (email, added_in) VALUES ($1, $2)';
        const { rows: result } = await pool.query(query, [email, JSON.stringify(addedIn)]);
        return result.insertId;
    } catch (error) {
        throw error;
    }
};

const updateAddedIn = async (addedIn, userId) => {
    try {
        const query = 'UPDATE users SET added_in = $1 WHERE user_id = $2';
        await pool.query(query, [JSON.stringify(addedIn), userId]);
    } catch (error) {
        throw error;
    }
};

const updateRoleUser = async (userId, roleId) => {
    try {
        const query = 'UPDATE roles SET user_id = $1, status = $2 WHERE role_id = $3';
        const { rows: result } = await pool.query(query, [userId, 'active', roleId]);
        return result.affectedRows;
    } catch (error) {
        throw error;
    }
};

const updateRoleWithTempUser = async (tempUserId, tempUserExpiry, roleId, tenantId) => {
    try {
        const query = `
            UPDATE roles 
            SET temp_user = $1, temp_user_expiry = $2 
            WHERE role_id = $3 AND tenant_id = $4`;

        await pool.query(query, [tempUserId, tempUserExpiry, roleId, tenantId]);
    } catch (error) {
        throw error;
    }
};

async function getTempUserId(tempUserEmail, tenantId) {
    try {
        let { rows: user } = await pool.query('SELECT user_id FROM users WHERE email = $1', [tempUserEmail]);
        let tempUserId;

        if (user.length === 0) {
            const { rows: result } = await pool.query('INSERT INTO users (email,added_in) VALUES ($1, $2)', [tempUserEmail, JSON.stringify(tenantId)]);
            tempUserId = result[0].insertId; 
        } else {
            tempUserId = user[0].user_id;
        }

        return tempUserId;
    } catch (error) {
        throw error;
    }
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
