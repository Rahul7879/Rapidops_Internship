const { sendSuccess, sendError } = require('../utilities/response.js');
const pool = require('../db/conn.js');
const { sendMail } = require('./send-mail.js');
const jwt = require("jsonwebtoken")

const createRole = async (req, res) => {
    try {
        const { isReadable, isWritable, isDeletable, isEditable, roleName } = req.body;
        const permissions = `${isReadable ? '1' : '0'}${isWritable ? '1' : '0'}${isDeletable ? '1' : '0'}${isEditable ? '1' : '0'}`;

        const { email } = req.user;

        const tenantQuery = 'SELECT my_tenant FROM users WHERE email = ?';
        const [user] = await pool.query(tenantQuery, [email]);

        if (!user[0] || user[0].my_tenant === null) {
            return sendError(res, { msg: 'No tenant ID found for user' }, 400);
        }

        const tenantId = user[0].my_tenant;
        const checkRoleExistQuery = 'SELECT COUNT(*) AS count FROM roles WHERE tenant_id = ? AND role_name = ?';
        const [existingRole] = await pool.query(checkRoleExistQuery, [tenantId, roleName]);

        if (existingRole[0].count > 0) {
            return sendError(res, { msg: `Role already exists in tenant ${user[0].my_tenant}` }, 409);
        }

        const insertRoleQuery = 'INSERT INTO roles (tenant_id, permissions, role_name) VALUES (?, ?, ?)';
        await pool.query(insertRoleQuery, [tenantId, permissions, roleName]);

        sendSuccess(res, { msg: 'Role created successfully' }, 201);
    } catch (e) {
        console.error(e);
        sendError(res, { msg: 'Error during role creation', error: e.message }, 500);
    }
};

const inviteRole = async (req, res) => {
    try {
        const { emailAndRole } = req.body;
        const requesterEmail = req.user.email;

        const requesterQuery = 'SELECT user_id, my_tenant FROM users WHERE email = ?';
        const [requester] = await pool.query(requesterQuery, [requesterEmail]);

        if (requester.length === 0) {
            return sendError(res, { msg: 'Requester not found' }, 404);
        }

        const tenantId = requester[0].my_tenant;

        for (let i = 0; i < emailAndRole.length; i++) {
            const { email, role_id } = emailAndRole[i];
            const userCheckQuery = 'SELECT user_id, added_in FROM users WHERE email = ?';
            const [existingUsers] = await pool.query(userCheckQuery, [email]);

            let userId;
            if (existingUsers.length > 0) {
                userId = existingUsers[0].user_id;
                let addedIn = existingUsers[0].added_in ? JSON.parse(existingUsers[0].added_in) : [];

                if (!Array.isArray(addedIn)) {
                    addedIn = [addedIn];
                }

                if (!addedIn.includes(tenantId)) {
                    addedIn.push(tenantId);
                    const updateAddedInQuery = 'UPDATE users SET added_in = ? WHERE user_id = ?';
                    await pool.query(updateAddedInQuery, [JSON.stringify(addedIn), userId]);
                }
            } else {
                const insertUserQuery = 'INSERT INTO users (email, added_in) VALUES (?, ?)';
                const [result] = await pool.query(insertUserQuery, [email, JSON.stringify([tenantId])]);
                userId = result.insertId;
            }
            console.log("_________heeee", role_id)
            await sendMail(email, userId, role_id);
        }

        sendSuccess(res, { msg: 'Role invitations sent successfully' }, 200);
    } catch (e) {
        console.error(e);
        sendError(res, { msg: 'Error sending role invitations', error: e.message }, 500);
    }
};



const acceptRequest = async (req, res) => {
    try {
        const { token } = req.params;

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (!decoded.role_id || !decoded.user_id) {
            sendError(res, { msg: "Invalid token" }, 401);
            return;
        }

        const updateRoleQuery = 'UPDATE roles SET user_id = ?, status = ? WHERE role_id = ? AND user_id IS NULL';
        const [updateResult] = await pool.query(updateRoleQuery, [decoded.user_id, 'active', decoded.role_id]);

        if (updateResult.affectedRows === 0) {
            sendError(res, { msg: "Role update failed or role already assigned" }, 400);
            return;
        }

        sendSuccess(res, { msg: 'Role invitation accepted successfully' }, 200);
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            sendError(res, { msg: "Token validation failed", error: e.message }, 401);
        } else {
            console.error(e);
            sendError(res, { msg: 'Error processing the role acceptance', error: e.message }, 500);
        }
    }
};



module.exports = { createRole, inviteRole, acceptRequest };
