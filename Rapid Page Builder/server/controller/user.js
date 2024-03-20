

import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import dotenv from 'dotenv';
import Token from "../model/token.js";
import Pages from "../model/pages.js";




dotenv.config();
 const signup = async (req, res) =>{
       try{
           const salt = await bcrypt.genSalt();
           const hashedPassword = await bcrypt.hash(req.body.password, salt)
           const user = {email : req.body.email , name: req.body.name, password: hashedPassword,newsletter:req.body.newsletter};
           const newUser = new User(user);
           await newUser.save();
           return res.status(200).json({msg:'SignUp succesfull'})
       }catch(e){
         return res.status(500).json({e: e.message});
       }
}
 const login = async (req,res) =>{
     try{
         let user = await User.findOne({email: req.body.email});
         if(!user){
             return res.status(404).json({msg: "username does not exist"});
            }
            let match =  await bcrypt.compare(req.body.password, user.password);;
            
            if(match){
                
                const accessToken = jwt.sign(user.toJSON(), "jwt-access-token-secret-key", {expiresIn: '15m'} );
                const refreshtoken =  jwt.sign(user.toJSON(), "jwt-refresh-token-secret-key");

                const newToken = new Token({token:refreshtoken, name:user.name, email:user.email})
                await newToken.save();
                res.cookie("accessToken",accessToken,{maxAge:60000})
                res.cookie("refreshtoken",refreshtoken,{maxAge:50000})
                
               return res.status(201).json({ accessToken:accessToken , refreshtoken: refreshtoken, name: user.name, username: user.username})

       }else{
        return res.status(406).json({msg: "Password does not match"})
       }

    }catch(e){
          console.log("login error");
          return res.status(501).json({msg:"error while login"})
       }
}



const getIndividual = async (req,res) =>{
    try{
        let user = await Pages.findOne({_id: req.body.id});
        console.log(user);
        if(!user){
            return res.status(404).json({msg: "content does not exist"});
           }
           return res.status(200).json({msg:"receinved",user:user})
   }catch(e){
     console.log("login");
         return res.status(501).json({msg:"error while login"})
      }
}


const checkUser = async(req,res)=>{
    console.log("dkl",req.cookies.refreshtoken)
   if(req.cookies.accessToken){
      return res.json({valide:true})
   }else{
    return res.json({valid:false})
   }
}









// import userModel from "../model/user.js"
// import bcrypt from 'bcryptjs';
// import { jwtAuthMiddleware, generateToken } from '../jwt/index.js';
// import jwt from 'jsonwebtoken'
// import cookie from "cookie-parser";




// const signup = (req, res) => {
//     console.log("hello");
//     userModel.findOne({ email: req.body.email }).then(async (result) => {
//         console.log(result);
//         if (result) {
//             return res.send({ code: 401, message: "Email already in use" })
//         } else {
//             const hasspassword = await bcrypt.hash(req.body.password, 10).then((result));
//             const newUser = new userModel({
//                 name: req.body.name,
//                 email: req.body.email,
//                 password: hasspassword,
//                 newsletter: req.body.newsletter,
//             })

//             const payload = {
//                 email: req.body.email
//             }
//             const token = generateToken(payload);
//             console.log(token);

//             newUser.save().then(() => {
//                 res.send({ code: 200, message: "Signup Successfully", token: token })
//             })
//                 .catch((err) => {
//                     console.log(err);
//                     res.send({ code: 501, message: "SignUp Error!" })
//                 })
//         }
//     })
// }

// async function compare(userPass, hashPass) {
//     const match = await bcrypt.compare(userPass, hashPass);
//     console.log("matching", match);
//     return match;
// }

// const login = (req, res) => {
    
//     userModel.findOne({ email: req.body.email })
//         .then(async (result) => {
//             if (!result) {
//                 return res.send({ code: 501, message: "User not found" });
//             }
//             const isMatch = await bcrypt.compare(req.body.password, result.password);;
//             console.log(isMatch);
//             if (isMatch) {
//                 const accessToken = jwt.sign({email: req.body.email}, 
//                     "jwt-access-token-secret-key", {expiresIn: '1m'})
//                 const refreshToken = jwt.sign({email: req.body.email}, 
//                     "jwt-refresh-token-secret-key", {expiresIn: '5m'})
//                 res.cookie('accessToken', accessToken, {maxAge: 60000})
//                 res.cookie('refreshToken', refreshToken, 
//                     {maxAge: 300000, httpOnly: true, secure: true, sameSite: 'strict'})
//                 res.send({ code: 200, message: "User found", email: result.email , accessToken: accessToken});
//             } else {
//                 res.send({ code: 404, message: "Wrong password" });
//             }
//         }).catch((err) => {
//             console.error(err);
//             res.status(500).send({ code: 501, message: "Server error" });
//         });
// }

export { signup, login,getIndividual,checkUser }