const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ResponseHandler = require('../utilities/response.js');
const dbcon = require('../db/conn.js');
const SECRET_KEY = "my_secret_key";  

const signupUser = async (req, res) => {
    try {
        const user = {
            email: req.body.email,
            password: req.body.password
        };

        const salt = await bcrypt.genSalt(10);
        console.log(salt,user.password)
        user.password = await bcrypt.hash(`${user.password}`, salt);

        const conn = await dbcon();
        const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
        await conn.execute(query, [user.email, user.password]);
        conn.end();

        const token = jwt.sign(
            { email: user.email },
            SECRET_KEY,
            { expiresIn: '24h' } 
        );

        ResponseHandler.sendSuccess(res, { token: token, msg: 'SignUp successful' }, 201);
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
        const conn = await dbcon();
   
        const query = 'SELECT * FROM users WHERE email = ? LIMIT 1';
        const [users] = await conn.query(query, [req.body.email]);
        conn.end();

        if (users.length === 0) {
            ResponseHandler.sendError(res, { msg: "Username does not exist" }, 404);
            return;
        }

        const user = users[0];
        const match = await bcrypt.compare(`${req.body.password}`, user.password); 

        if (match) {
            const token = jwt.sign({
                userId: user.id,
                email: user.email
            }, SECRET_KEY, { expiresIn: req.body.rememberMe ? '1h' : '1m' }); 
         
            res.setHeader('Set-Cookie', `accessToken=${token}; Path=/; HttpOnly; SameSite=None; Secure`);
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
        const userData = { name: "Rahul" };
        ResponseHandler.sendSuccess(response, userData, 200);
    } catch (error) {
        ResponseHandler.sendError(response, { msg: 'Unauthorized access', error: error.message }, 401);
    }
};





module.exports = { loginUser, signupUser, getProfileData };
