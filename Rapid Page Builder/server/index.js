import express from 'express';
import './db/conn.js';
import cors from 'cors';
import bodyParser from 'body-parser'
import Router from './Routes/router.js';
import dotenv from 'dotenv'
import cron from 'node-cron'
import cookieParser from 'cookie-parser';
import sendMails from './controller/sendMail.js';
const app = express();

dotenv.config();
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

cron.schedule('0 8 * * * *', sendMails );

 