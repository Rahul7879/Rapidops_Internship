const pool = require('../db/conn');

const checkUserAccess = async (userId, tenantId) => {
    try {
        let query = 'SELECT role_id, permissions, role_name FROM roles WHERE user_id = $1 AND tenant_id = $2 LIMIT 1';
        let { rows: users } = await pool.query(query, [userId, tenantId]);
        if (users.length === 0) {
            query = 'SELECT role_id, permissions, role_name, temp_user_expiry FROM roles WHERE temp_user = $1 AND tenant_id = $2 LIMIT 1';
            ({ rows: users } = await pool.query(query, [userId, tenantId]));

            if (users.length === 0) {
                throw { msg: 'User does not have access to this tenant', status: 403 };
            }

            const user = users[0];
            const now = new Date();

            if (new Date(user.temp_user_expiry) <= now) {
                throw { msg: 'Temporary access has expired', status: 403 };
            }
            
            return {
                userId: userId,
                permissions: user.permissions,
                isAdmin: user.role_name === "admin",
                roleId: user.role_id,
                tempUserExpiry: new Date(user.temp_user_expiry),
                isTempUser: true
            };
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

const createUser = async (email, password, fullName) => {
    try {
        const query = 'INSERT INTO users (email, password, name) VALUES ($1, $2, $3)';
        await pool.query(query, [email, password, fullName]);
    } catch (error) {
        throw error;
    }
};

const findUserByEmail = async (email) => {
    try {
        const query = 'SELECT email, password, my_tenant, added_in, user_id FROM users WHERE email = $1 LIMIT 1';
        const { rows } = await pool.query(query, [email]);
        return rows.length ? rows[0] : null;
    } catch (error) {
        throw error;
    }
};

const updateUserPassword = async (email, newPassword) => {
    try {
        const query = 'UPDATE users SET password = $1 WHERE email = $2';
        await pool.query(query, [newPassword, email]);
    } catch (error) {
        throw error;
    }
};

const getTenantAdminEmail = async (tenantId) => {
    try {
        const query = `
            SELECT u.email 
            FROM users u 
            JOIN roles r ON u.user_id = r.user_id 
            WHERE r.role_name = 'admin' AND u.my_tenant = $1
            LIMIT 1`;

        const { rows: result } = await pool.query(query, [tenantId]);

        return result.length ? result[0].email : null;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUser,
    findUserByEmail,
    checkUserAccess,
    updateUserPassword,
    getTenantAdminEmail
};
