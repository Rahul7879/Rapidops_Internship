import express from "express";
import { checkUser, getIndividual, login, signup } from "../controller/user.js";
import { getPage } from "../controller/getPage.js";
import sendMail from '../controller/sendMail.js'
import { createPage, getAllPages, updatePage } from "../controller/pages.js";
import publishedPages from "../controller/publishedPages.js";
import deletePage from "../controller/deletePage.js";
import varifyUser from "../jwt/verifyToken.js";
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/create', createPage)
router.post('/getdata', getPage)
router.get('/mail', sendMail);
router.get('/pages/:slug', publishedPages);
router.get('/getallpages', varifyUser, getAllPages)
router.delete('/delete/:id', deletePage)
router.post('/get', getIndividual)
router.put('/update', updatePage)
router.get('/checkUser', checkUser)

export default router;