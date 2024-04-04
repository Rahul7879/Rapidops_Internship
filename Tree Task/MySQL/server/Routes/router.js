import express from "express";
import addNode from "../controllers/addNode.js";
import getData from "../controllers/getData.js";
import deleteNode from "../controllers/deleteNode.js";
import updateNode from "../controllers/updateNode.js";
import mergeNode from "../controllers/mergeNode.js";

const router = express.Router();

router.post('/add',addNode)
router.get('/get',getData)
router.delete('/delete/:id',deleteNode)
router.patch('/update',updateNode)
router.patch('/merge',mergeNode)


export default router;