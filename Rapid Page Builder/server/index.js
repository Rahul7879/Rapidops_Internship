import express from 'express';
import './db/conn.js';
import cors from 'cors';
import bodyParser from 'body-parser'
import Router from './Routes/router.js';
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import cron from 'node-cron'
import Pages from './model/pages.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(bodyParser.json({extended:true}));
app.use(cors({
   origin: ["http://localhost:5173"],
   credentials: true
})) 
app.use(cookieParser());

app.use('/',Router);
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log("Server is listening");
})

const  sendToALL = async (email , htmldata,date)=>{
   const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
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


cron.schedule('0 8 * * * *',async function(){

          const now = new Date();
          let year = now.getFullYear();
          let month = (now.getMonth()+1 > 9) ? now.getMonth()+1 : `0${now.getMonth()+1}` 
          let day = (now.getDate() > 9) ? now.getDate() : `0${now.getDate()}` 
          let date = `${year}-${month}-${day}`
          let allMails = await Pages.find();
          let mail = [];
          let htmlBody = [];
          
          allMails.forEach(element => {
           let str = date;
             console.log("cron running");
             if(str.includes(date)){
              sendToALL(element.email,element.title,element.publishDate)
              }
           });
})
