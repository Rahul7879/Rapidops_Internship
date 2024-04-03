import express from 'express';
import dbcon from './db/conn.js';
import cors from 'cors';
import bodyParser from 'body-parser'
import Router from './Routes/router.js';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
const app = express();

dotenv.config();
app.use(cookieParser());
app.use(bodyParser.json({extended:true}));
app.use(cors({
   origin: ["http://localhost:3000"],
   credentials: true
})) 

dbcon();
app.use('/',Router);
const PORT = process.env.PORT || 4500
app.listen(PORT,()=>{
    console.log("Server is listening");
})


