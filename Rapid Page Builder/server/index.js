import express from 'express';
import './db/conn.js';
import {signup,login} from './controller/user.js'
import {createPage} from './controller/creatPage.js'
import bodyParser from 'body-parser'
import cors from 'cors';
import jwt from 'jsonwebtoken';
const app = express();
const port = 5000;
const jwtKey = "mykey"

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.post('/signup',signup)
app.post('/login',login)
app.post('/create',createPage)

app.listen(port,()=>{
    console.log(`listioning on port ${port}`);
}) 