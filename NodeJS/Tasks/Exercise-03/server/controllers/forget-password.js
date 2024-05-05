const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ejs = require('ejs');
const dbConnection = require('../db/conn.js');
const nodemailer = require('nodemailer');
const ResponseHandler = require('../utilities/response');
const SECRET_KEY = "my_secret_key";

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const conn = await dbConnection();
    const query = 'SELECT id, email FROM users WHERE email = ? LIMIT 1';
    const [users] = await conn.query(query, [email]);
    conn.end();

    if (users.length === 0) {
      ResponseHandler.sendError(res, { msg: "User does not exist" }, 404);
      return;
    }

    const user = users[0];
    const token = jwt.sign({ email: user.email, id: user.id }, SECRET_KEY, { expiresIn: '5m' });

    const resetLink = `http://localhost:8000/reset-password/${user.id}/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rahulspc7879@gmail.com",
        pass: "csocojmbgoqesafd",
      },
    });

    const mailOptions = {
      from: "Rahul Singh Rajput",
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
    const userEmail = "user@example.com";

    const filePath = __dirname + '/index.ejs';
    console.log(filePath, "Complete path to the EJS file");

    ejs.renderFile(filePath, {
      email: userEmail,
      id: id,
      token: token
    }, (err, html) => {
      if (err) {
        console.error("Error rendering reset password page:", err);
        return ResponseHandler.sendError(res, { msg: 'Error while processing your request', error: err.message }, 500);
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
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

    const conn = await dbConnection();
    const updateQuery = 'UPDATE users SET password = ? WHERE id = ?';
    await conn.query(updateQuery, [encryptedPassword, id]);
    conn.end();
   console.log("working")
    ResponseHandler.sendSuccess(res, { msg: "Password successfully updated." }, 200);

  } catch (error) {
    ResponseHandler.sendError(res, { msg: "Failed to reset password", error: error.message }, 500);
  }
};

module.exports = { forgetPassword, getResetPassword, postResetPassword };
