const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const ResponseHandler = require('../utilities/response');
const SECRET_KEY = process.env.SECRET_KEY;

const sendMail = async (email,user_id,role_id) => {

  try {
    const token = jwt.sign({ email: email, user_id: user_id,role_id:role_id }, SECRET_KEY, { expiresIn: '6h' });

    const requestLink = `http://localhost:${process.env.PORT}/invite/${user_id}/${token}`;

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
      subject: "Invitation",
      text: `Please follow this link acceept Request: ${requestLink}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        ResponseHandler.sendError( { msg: 'Failed to send email', error: error.message }, 500);
      } else {
        ResponseHandler.sendSuccess( { msg: 'Email sent successfully' }, 200);
      }
    });
  } catch (error) {
    ResponseHandler.sendError(res, { msg: 'Error while processing your request', error: error.message }, 500);
  }
};



module.exports = { sendMail};