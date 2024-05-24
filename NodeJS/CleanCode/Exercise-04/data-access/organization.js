const pool = require('../db/conn');

async function fetchUserIdByEmail(email) {
    const query = 'SELECT user_id FROM users WHERE email = ? LIMIT 1';
    const [[user]] = await pool.query(query, [email]);
    return user ? user.user_id : null;
}

async function checkExistingOrganization(adminId) {
    const query = 'SELECT 1 FROM organizations WHERE admin_id = ? LIMIT 1';
    const [existing] = await pool.query(query, [adminId]);
    return existing.length > 0;
}

async function createAdminRole(userId, tenantId) {
    const query = 'INSERT INTO roles (user_id, role_name, tenant_id, permissions, status) VALUES (?, ?, ?, ?, "active")';
    try {
        const tenantIdInt = parseInt(tenantId, 10);
        console.log("Attempting to create admin role with userID:", userId, "and tenantID:", tenantIdInt);
        await pool.query(query, [userId, "admin", tenantIdInt, "1111"]);
        console.log("Admin role created successfully.");
    } catch (error) {
        console.error("Error creating admin role:", error.message, { userId, tenantId });
        throw error;
    }
}

async function createOrganization(userId, orgName) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const insertOrgQuery = 'INSERT INTO organizations (name, admin_id) VALUES (?, ?)';
        const [insertResult] = await connection.query(insertOrgQuery, [orgName, userId]);
        const newOrgId = insertResult.insertId;
        await connection.commit();
        return newOrgId;
    } catch (error) {
        await connection.rollback();
        console.error('Failed to create organization:', error);
        throw error;
    } finally {
        connection.release();
    }
}

async function setTenantForUser(userId, tenantId) {
    const query = 'UPDATE users SET my_tenant = ? WHERE user_id = ?';
    await pool.query(query, [tenantId, userId]);
}

module.exports = {
    fetchUserIdByEmail,
    checkExistingOrganization,
    createAdminRole,
    createOrganization,
    setTenantForUser
};

