// const sessions = {};
// const EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// function createSession(user) {
//     const sessionId = Date.now().toString(36) + Math.random().toString(36).substring(2);
//     return sessionId;
// }

// function getSession(sessionId) {
//     const session = sessions[sessionId];
//     if (session && (Date.now() - session.created) < EXPIRY_TIME) {
//         return session;
//     }

//     delete sessions[sessionId];
//     return null;
// }

const dbcon = require('./db/conn.js');

async function getSession(sessionId) {
    const selectQuery = 'SELECT sessionId, createdAt, userId FROM sessions WHERE sessionId = ?';
    const now = new Date();

    try {
        const [rows] = await db.execute(selectQuery, [sessionId]);
        const db = await dbcon();
        if (rows.length > 0) {
            const session = rows[0];
            const expiryTime = new Date(session.createdAt.getTime() + EXPIRY_TIME);

            if (now < expiryTime) {
                // Session is valid, update createdAt to extend the session
                const updateQuery = 'UPDATE sessions SET createdAt = ? WHERE sessionId = ?';
                const newCreatedAt = new Date();
               
                await db.execute(updateQuery, [newCreatedAt, sessionId]);

                console.log("Session updated with new createdAt time:", sessionId);
                return {...session, createdAt: newCreatedAt};  // Return updated session object
            }
        }

        // Session expired or not found, delete it
       
        await db.execute('DELETE FROM sessions WHERE sessionId = ?', [sessionId]);
        console.log("Session expired or not found, deleted from DB:", sessionId);
    } catch (err) {
        console.error("Error retrieving or updating session:", err);
    }
    
    return null;
}


async function createSession(user) {
    const sessionId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    const createdAt = new Date();
    const query = 'U INTO users (sessionId, createdAt, user) VALUES (?, ?, ?)';
    const db = await dbcon();
    try {
        await db.execute(query, [sessionId, createdAt, user]);
        console.log("Session created with ID:", sessionId);
        console.log(sessionId)
        return sessionId;
    } catch (err) {
        console.error("Error creating session:", err);
        return null;
    }
}


module.exports = { createSession, getSession };
