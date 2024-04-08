import nodemailer from 'nodemailer'
import Pages from '../model/pages.js';

const  sendToALL = async (email , date,htmldata)=>{
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
      from : "Rapidops",
      to: email,
      subject:"cron test mail",
      html: `Your todays task is ${htmldata} and publish date is ${date}` 
    }

    transporter.sendMail(mailOptions,function(err,info){
       if(err){
          console.log(err);
       }else{
          console.log("mail sent ")
       }
    });
}




const sendMails = async function() {
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();
  let day = now.getDate();
  let startOfDay = new Date(year, month, day, 0, 0, 0, 0);
  let endOfDay = new Date(year, month, day, 23, 59, 59, 999);

  let TodaysTask = await Pages.find({
      publishDate: {
          $gte: startOfDay.toISOString(),
          $lte: endOfDay.toISOString()
      }
  });

  let tasksByEmail = {};
 console.log("running")
  TodaysTask.forEach(task => {
     if (!tasksByEmail[task.email]) {
        tasksByEmail[task.email] = [];
     }
     tasksByEmail[task.email].push(task);
  });
  
  console.log(tasksByEmail);
  for (const [email, tasks] of Object.entries(tasksByEmail)) {
      let htmlBody = `<h1>Tasks for ${startOfDay.toISOString().split('T')[0]}</h1>`;
      tasks.forEach(task => {
          htmlBody += `<p>Title: ${task.title}<br>Publish Date: ${formatAsIST(task.publishDate)}</p>`;
      });

      sendToALL(email, `Your Tasks for ${startOfDay.toISOString().split('T')[0]}`, htmlBody);
  }
}


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