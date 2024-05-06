const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ejs = require('ejs');
const pool = require('../db/conn.js');
const nodemailer = require('nodemailer');
const ResponseHandler = require('../utilities/response');
const SECRET_KEY = process.env.SECRET_KEY;

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const query = 'SELECT id, email FROM users WHERE email = ? LIMIT 1';
    const [users] = await pool.query(query, [email]);

    if (users.length === 0) {
      ResponseHandler.sendError(res, { msg: "User does not exist" }, 404);
      return;
    }

    const user = users[0];
    const token = jwt.sign({ email: user.email, id: user.id }, SECRET_KEY, { expiresIn: '5m' });

    const resetLink = `http://localhost:${process.env.PORT}/reset-password/${user.id}/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
      },
    });

    const mailOptions = {
      from: process.env.USER_NAME,
      to: email,
      subject: "Password Reset",
      text: `Please follow this link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        ResponseHandler.sendError(res, { msg: 'Failed to send email', error: error.message }, 500);
      } else {
        ResponseHandler.sendSuccess(res, { msg: 'Email sent successfully' }, 200);
      }
    });
  } catch (error) {
    ResponseHandler.sendError(res, { msg: 'Error while processing your request', error: error.message }, 500);
  }
};

const getResetPassword = async (req, res) => {
  const { id, token } = req.params;

  try {
    const filePath = path.join(path.dirname(__dirname),'view', 'index.html');
    console.log(filePath);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error("Error reading HTML file:", err);
        return ResponseHandler.sendError(res, { msg: 'Error while processing your request', error: err.message }, 500);
      }

      const replacedHtml = data
        .replace('{{userId}}', id)
        .replace('{{id}}', id)
        .replace('{{token}}', token);

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(replacedHtml);
    });
  } catch (error) {
    ResponseHandler.sendError(res, { msg: 'Error while processing your request', error: error.message }, 500);
  }
};


const postResetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    ResponseHandler.sendError(res, { msg: "Passwords do not match" }, 400);
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (decoded.id !== Number(id)) {
      ResponseHandler.sendError(res, { msg: "Invalid token" }, 401);
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const updateQuery = 'UPDATE users SET password = ? WHERE id = ?';
    await pool.query(updateQuery, [encryptedPassword, id]);

    ResponseHandler.sendSuccess(res, { msg: "Password successfully updated." }, 200);

  } catch (error) {
    ResponseHandler.sendError(res, { msg: "Failed to reset password", error: error.message }, 500);
  }
};

module.exports = { forgetPassword, getResetPassword, postResetPassword };
