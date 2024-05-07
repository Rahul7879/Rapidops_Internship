const pool = require('../db/conn.js');
const uuid = require("uuid")


async function createSession(jwtToken) {
    const checkTableQuery = "SHOW TABLES LIKE 'sessions'";
    const [tables] = await pool.execute(checkTableQuery);

    if (tables.length === 0) {
        const createTableQuery = `
            CREATE TABLE sessions (
                sessionId varchar(255) primary key,
                jwtToken varchar(255)
            )
        `;
        await pool.execute(createTableQuery);
    }
    const sessionId = uuid.v4(); 
    const query = 'INSERT INTO sessions (sessionId, jwtToken) VALUES (?, ?)';

    try {
        await pool.execute(query, [sessionId, jwtToken]); 
        return sessionId;
    } catch (err) {
        console.error("Error creating session:", err);
        return null;
    }
}


module.exports = { createSession };
