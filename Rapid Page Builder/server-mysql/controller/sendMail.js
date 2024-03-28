import nodemailer from 'nodemailer'
import dbcon from '../db/conn.js';

const sendToALL = async (email, date, htmldata) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: "Rapidops",
        to: email,
        subject: "Reminder",
        html: `Your todays task is ${htmldata} and publish date is ${date}`
    }

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log("mail sent ")
        }
    });
}


const sendMails = async function () {
    const now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let day = now.getDate();
    let startOfDay = new Date(year, month, day, 0, 0, 0, 0);
    let endOfDay = new Date(year, month, day, 23, 59, 59, 999);

    try {
        const conn = await dbcon();
        const query = `
          SELECT * 
          FROM pages 
          WHERE publishDate >= ? AND publishDate <= ?
      `;
        const [rows] = await conn.execute(query, [startOfDay.toISOString(), endOfDay.toISOString()]);
        let tasksByEmail = {};
        rows.forEach(task => {
            if (!tasksByEmail[task.email]) {
                tasksByEmail[task.email] = [];
            }
            tasksByEmail[task.email].push(task);
        });

        for (const [email, tasks] of Object.entries(tasksByEmail)) {
            let htmlBody = `<h1>Tasks for ${startOfDay.toISOString().split('T')[0]}</h1>`;
            tasks.forEach(task => {
                htmlBody += `<p>Title: ${task.title}<br>Publish Date: ${formatAsIST(task.publishDate)}</p>`;
            });
            await sendToALL(email, `Your Tasks for ${startOfDay.toISOString().split('T')[0]}`, htmlBody);
        }
        console.log("Emails sent successfully");
    } catch (error) {
        console.error("Error sending emails:", error);
    }
};


function formatAsIST(date) {
    return new Intl.DateTimeFormat('en-IN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Kolkata'
    }).format(new Date(date));
}
export default sendMails;