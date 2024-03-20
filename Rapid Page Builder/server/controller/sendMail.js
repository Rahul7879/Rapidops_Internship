import nodemailer from 'nodemailer'

const sendMail = async (req,res)=>{
    res.send("Mail sendign");

    let testAccount = await nodemailer.createTestAccount;

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: "maddison53@ethereal.email",
          pass: "jn7jnAPss4f63QBp6D",
        },
      });
}

export default sendMail;