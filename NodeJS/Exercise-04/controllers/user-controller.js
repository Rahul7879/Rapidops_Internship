const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {sendSuccess,sendError} = require('../utilities/response.js');
const pool = require('../db/conn.js');
const {validateEmail,validateFullName,validatePassword} = require("../utilities/validations.js");

const SECRET_KEY = process.env.SECRET_KEY;  

const signupUser = async (req, res) => {
    try {
        const { email, password, fullName } = req.body;
        
        if (!validateEmail(email)) {
            return sendError(res, { msg: 'Invalid email format' }, 400);
        }
        if (!validatePassword(password)) {
            return sendError(res, { msg: 'Password must be at least 6 characters long' }, 400);
        }
        if (!validateFullName(fullName)) {
            return sendError(res, { msg: 'Full name must not contain numbers' }, 400);
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(`${password}`, salt);
        
        const query = 'INSERT INTO users (email, password, name) VALUES (?,?,?)';
        await pool.execute(query, [email, hashPassword, fullName]);
        
        const token = jwt.sign({
            email: email
        }, SECRET_KEY, { expiresIn: '1h' });

        res.setHeader(
            'Set-Cookie',
            `accessToken=${token}; Path=/; HttpOnly; SameSite=None; Secure; Max-Age=${process.env.COOKIE_AGE}`
          );
          console.log("hello")

        sendSuccess(res, { msg: 'SignUp successful' }, 201);
    } catch (e) {
        console.error(e);
        if (e.code === 'ER_DUP_ENTRY') {
            sendError(res, { msg: 'User already exists' }, 409);
        } else {
            sendError(res, { msg: 'Error during registration', error: e.message }, 500);
        }
    }
};

const loginUser = async (req, res) => {
    try {
        const {email,password} = req.body;

        const query = 'SELECT email, password,my_tenant,added_in,user_id FROM users WHERE email = ? LIMIT 1';
        const [users] = await pool.query(query, [email]);

        if (users.length === 0) {
            sendError(res, { msg: "Username does not exist" }, 404);
            return;
        }

        const user = users[0];

        if(user.password === null){
            sendError(res, { msg: 'Password is Not Setted yet change your password' }, 401);
            return;
        }
        const match = await bcrypt.compare(`${password}`, user.password); 
        if (match) {
            const token = jwt.sign({
                userId: user.user_id,
                email: user.email
            }, SECRET_KEY, { expiresIn: req.body.rememberMe ? "7d" : '1h' }); 
            
            res.setHeader(
                'Set-Cookie',
                `accessToken=${token}; Path=/; HttpOnly; SameSite=None; Secure; Max-Age=${process.env.COOKIE_AGE}`
              );
            sendSuccess(res, {msg: 'Login successful',my_tenant: user.my_tenant,added_in:user.added_in }, 200);
        } else {
            sendError(res, { msg: 'Password does not match' }, 401);
        }
    } catch (e) {
        console.error("login error:", e.message);
        sendError(res, { msg: 'Error while login', error: e.message }, 500);
    }
};

const loginInTenant = async (req, res) => {
    try {
        const { tenantId } = req.params;
        const { email, userId } = req.user;

        const query = 'SELECT role_id, permissions, role_name FROM roles WHERE user_id = ? AND tenant_id = ? LIMIT 1';
        const [users] = await pool.query(query, [userId, tenantId]);

        if (users.length === 0) {
             sendError(res, { msg: 'User does not have access to this tenant' }, 403);
            return;
        }

        const user = users[0];
        
        const token = jwt.sign({
            userId: userId,
            email: email,
            tenantId: +tenantId,
            permissions: user.permissions,
            isAdmin:user.role_name === "admin",
            roleId: user.role_id
        }, SECRET_KEY, { expiresIn: '1h' });

        res.setHeader(
            'Set-Cookie',
            `accessToken=${token}; Path=/; HttpOnly; SameSite=None; Secure; Max-Age=${process.env.COOKIE_AGE}`
        );
        sendSuccess(res, { msg: 'Tenant login successful', tenantId: tenantId }, 200);
    } catch (error) {
        console.error("Tenant login error:", error.message);
        sendError(res, { msg: 'Error while logging in to tenant', error: error.message }, 500);
    }
}


module.exports = {signupUser,loginUser,loginInTenant}