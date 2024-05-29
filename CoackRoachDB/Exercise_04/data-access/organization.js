const pool = require('../db/conn');

async function fetchUserIdByEmail(email) {
    try {
        const query = 'SELECT user_id FROM users WHERE email = $1 LIMIT 1';
        const { rows: [user] } = await pool.query(query, [email]);
        return user ? user.user_id : null;
    } catch (error) {
        console.error('Error fetching user ID by email:', error.message);
        throw error;
    }
}

async function checkExistingOrganization(adminId) {
    try {
        const query = 'SELECT 1 FROM organizations WHERE admin_id = $1 LIMIT 1';
        const { rows: existing } = await pool.query(query, [adminId]);
        return existing.length > 0;
    } catch (error) {
        console.error('Error checking existing organization:', error.message);
        throw error;
    }
}

async function createAdminRole(userId, tenantId) {
    try {
        console.log("Attempting to create admin role with userID:", userId, "and tenantID:", tenantId);
        const query = 'INSERT INTO roles (user_id, role_name, tenant_id, permissions, status) VALUES ($1, $2, $3, $4, $5)';
        await pool.query(query, [userId, "admin", tenantId, "1111", "active"]);
        console.log("Admin role created successfully.");
    } catch (error) {
        console.error("Error creating admin role:", error.message, { userId, tenantId });
        throw error;
    }
}

async function createOrganization(userId, orgName) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const insertOrgQuery = 'INSERT INTO organizations (name, admin_id) VALUES ($1, $2) RETURNING tenant_id';
        const { rows } = await client.query(insertOrgQuery, [orgName, userId]);
        if (rows.length > 0) {
            const newOrgId = rows[0].tenant_id;
            await client.query('COMMIT');
            return newOrgId;
        } else {
            throw new Error('Failed to retrieve new organization ID');
        }
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Failed to create organization:', error.message);
        throw error;
    } finally {
        client.release();
    }
}

async function setTenantForUser(userId, tenantId) {
    try {
        const query = 'UPDATE users SET my_tenant = $1 WHERE user_id = $2';
        await pool.query(query, [tenantId, userId]);
    } catch (error) {
        console.error('Error setting tenant for user:', error.message);
        throw error;
    }
}

module.exports = {
    fetchUserIdByEmail,
    checkExistingOrganization,
    createAdminRole,
    createOrganization,
    setTenantForUser
};
