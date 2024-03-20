import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const jwtAuthMiddleware = (req,res,next)=>{

    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({err:"Token Not Found"})

    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({ error: "Unauthorized"})
    console.log("rij",token);
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        console.log("done",decode);
       req.user = decode;
       next();
    }catch(err){
       console.log(err);
       return res.status(401).json({ error: "Error"})
    }
}

const generateToken = (useData)=>{
    return jwt.sign(useData,process.env.JWT_SECRET,{expiresIn:600})
}

export  {jwtAuthMiddleware,generateToken};