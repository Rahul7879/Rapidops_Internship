const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ResponseHandler = require('../utilities/response.js');
const pool = require('../db/conn.js')

const SECRET_KEY = process.env.SECRET_KEY;  

const signupUser = async (req, res) => {
    try {
        const user = {
            email: req.body.email,
            password: req.body.password
        };
         
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(`${user.password}`, salt);

        const checkTableQuery = "SHOW TABLES LIKE 'users'";
        const [tables] = await pool.execute(checkTableQuery);

        if (tables.length === 0) {
            const createTableQuery = `
                CREATE TABLE users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255),
                    fullName VARCHAR(255)
                )
            `;
            await pool.execute(createTableQuery);
        }

        const query = 'INSERT INTO users (email, password, fullName) VALUES (?,?,?)';
        await pool.execute(query, [user.email, user.password, req.body.fullName]);
        
        const token = jwt.sign({
            email: user.email
        }, SECRET_KEY, { expiresIn: '1h' }); 
        
        res.setHeader(
            'Set-Cookie',
            `accessToken=${token}; Path=/; HttpOnly; SameSite=None; Secure; Max-Age=${process.env.COOKIE_AGE}`
          );

        ResponseHandler.sendSuccess(res, { msg: 'SignUp successful' }, 201);
    } catch (e) {
        console.error(e);
        if (e.code === 'ER_DUP_ENTRY') {
            ResponseHandler.sendError(res, { msg: 'User already exists' }, 409);
        } else {
            ResponseHandler.sendError(res, { msg: 'Error during registration', error: e.message }, 500);
        }
    }
};

const loginUser = async (req, res) => {
    try {
        const query = 'SELECT * FROM users WHERE email = ? LIMIT 1';
        const [users] = await pool.query(query, [req.body.email]);

        if (users.length === 0) {
            ResponseHandler.sendError(res, { msg: "Username does not exist" }, 404);
            return;
        }

        const user = users[0];

        if(user.password === null){
            ResponseHandler.sendError(res, { msg: 'Password is Not Setted yet change your password' }, 401);
            return;
        }
        const match = await bcrypt.compare(`${req.body.password}`, user.password); 

        if (match) {
            const token = jwt.sign({
                userId: user.id,
                email: user.email
            }, SECRET_KEY, { expiresIn: req.body.rememberMe ? null : '1h' }); 
            
            res.setHeader(
                'Set-Cookie',
                `accessToken=${token}; Path=/; HttpOnly; SameSite=None; Secure; Max-Age=${process.env.COOKIE_AGE}`
              );
            ResponseHandler.sendSuccess(res, { token: token, msg: 'Login successful' }, 200);
        } else {
            ResponseHandler.sendError(res, { msg: 'Password does not match' }, 401);
        }
    } catch (e) {
        console.error("login error:", e.message);
        ResponseHandler.sendError(res, { msg: 'Error while login', error: e.message }, 500);
    }
};



const getProfileData = async (request, response) => {
    try {
        const query = 'SELECT id ,email,fullName FROM users WHERE email = ? LIMIT 1';
        const [users] = await pool.query(query, [request.user.email]);
        ResponseHandler.sendSuccess(response, users[0], 200);
    } catch (error) {
        ResponseHandler.sendError(response, { msg: 'Unauthorized access', error: error.message }, 401);
    }
};

const logOutUser = async (req, res) => {
    try {
        res.setHeader(
            'Set-Cookie',
            `accessToken=''; Path=/; HttpOnly; SameSite=None; Secure; Max-Age=${30}`
            );
          ResponseHandler.sendSuccess(res, { msg: "Deleted" }, 200)
    } catch (error) {
        ResponseHandler.sendError(res, { msg: 'Not Deleted', error: error.message }, 401);
    }
};

module.exports = { loginUser, signupUser, getProfileData,logOutUser };
