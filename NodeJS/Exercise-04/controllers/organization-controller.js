const { sendSuccess, sendError } = require('../utilities/response.js');
const pool = require('../db/conn.js');

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
    const query = 'INSERT INTO roles (user_id, role_name, tenant_id, permissions,status) VALUES (?, ?, ?, ?,"active")';
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


async function createOrganizationAndSetTenant(userId, orgName) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const insertOrgQuery = 'INSERT INTO organizations (name, admin_id) VALUES (?, ?)';
        const [insertResult] = await connection.query(insertOrgQuery, [orgName, userId]);
        const newOrgId = insertResult.insertId;
        console.log(newOrgId)
        const updateUserQuery = 'UPDATE users SET my_tenant = ? WHERE user_id = ?';
        await connection.query(updateUserQuery, [newOrgId, userId]);


        await connection.commit();
        await createAdminRole(userId, newOrgId);
        console.log("hello")
        return newOrgId;
    } catch (error) {
        await connection.rollback();
        console.error('Failed to create organization and set tenant:', error);
        throw error;
    } finally {
        connection.release();
    }
}

const createTenant = async (req, res) => {
    try {
        const { email } = req.user;
        const orgName = req.body.tenantName;
        console.log(orgName)

        const userId = await fetchUserIdByEmail(email);
        if (!userId) {
            return sendError(res, { msg: 'User not found' }, 404);
        }

        const exists = await checkExistingOrganization(userId);
        if (exists) {
            return sendError(res, { msg: 'Organization already created for this user' }, 409);
        }

        await createOrganizationAndSetTenant(userId, orgName);

        sendSuccess(res, { msg: 'SignUp, organization creation, and admin role assignment successful' }, 201);
    } catch (e) {
        console.error(e);
        sendError(res, { msg: 'Error during creating tenant', error: e.message }, 500);
    }
};

module.exports = { createTenant };
