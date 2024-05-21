const pool = require('../db/conn');

const createOrganization = async (name, adminId) => {
    const query = 'INSERT INTO organizations (name, admin_id) VALUES (?, ?)';
    await pool.execute(query, [name, adminId]);
};

const checkExistingOrganization = async (adminId) => {
    const query = 'SELECT 1 FROM organizations WHERE admin_id = ? LIMIT 1';
    const [existing] = await pool.query(query, [adminId]);
    return existing.length > 0;
};

module.exports = {
    createOrganization,
    checkExistingOrganization,
};
