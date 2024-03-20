import express from "express";
import { checkUser, getIndividual, login, signup} from "../controller/user.js";
import { getPage } from "../controller/getPage.js";
import sendMail from '../controller/sendMail.js'
import {createPage,getAllPages,updatePage} from "../controller/pages.js";
import publishedPages from "../controller/publishedPages.js";
import deletePage from "../controller/deletePage.js";
const router = express.Router();
import upload from "../Routes/multer.js";
import { jwtAuthMiddleware } from "../jwt/index.js";
import jwt from "jsonwebtoken";

router.post('/login',login);
router.post('/signup',signup);
router.post('/create' , createPage )
router.post('/getdata',getPage)
router.get('/mail',sendMail);

router.get('/pages/:slug', publishedPages);
router.delete('/delete/:id',deletePage)
router.post('/get',getIndividual)
router.put('/update',updatePage)



const varifyUser = async  (req, res, next) => {
    const accesstoken = await req.cookies.accessToken;
    console.log(accesstoken);
    if(!accesstoken) {
        if(renewToken(req, res)) {
            next()
        }
    } else {
        jwt.verify(accesstoken, 'jwt-access-token-secret-key', (err ,decoded) => {
            if(err) {
                console.log("not accesstoken")
                return ;
            } else {
                req.email = decoded.email
                console.log(decoded.email)
                next()
            }
        })
    }
}

const renewToken = async (req, res) => {
    const refreshtoken = await req.cookies.refreshToken;
    console.log("------------",refreshtoken);
    let exist = false;
    if(!refreshtoken) {
        return res.json({valid: false, message: "No Refresh token"})
    } else {
        jwt.verify(refreshtoken, 'jwt-refresh-token-secret-key', (err ,decoded) => {
            if(err) {
                return res.json({valid: false, message: "Invalid Refresh Token"})
            } else {
                const accessToken = jwt.sign({email: decoded.email}, 
                    "jwt-access-token-secret-key", {expiresIn: '5m'})
                    res.cookie('accessToken', accessToken, {maxAge: 60000})
                    exist = true;
                }
            })
        }
        return exist;
    }
    
    router.get('/getallpages',getAllPages)
    router.get('/checkUser', checkUser)
    
    export default router;