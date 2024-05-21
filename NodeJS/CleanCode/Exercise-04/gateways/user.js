const pool = require('../db/conn');

const createUser = async (email, password, fullName) => {
    const query = 'INSERT INTO users (email, password, name) VALUES (?,?,?)';
    await pool.execute(query, [email, password, fullName]);
};

const findUserByEmail = async (email) => {
    const query = 'SELECT email, password, my_tenant, added_in, user_id FROM users WHERE email = ? LIMIT 1';
    const [users] = await pool.query(query, [email]);
    return users.length ? users[0] : null;
};

module.exports = {
    createUser,
    findUserByEmail,
};
