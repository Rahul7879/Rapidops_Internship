

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
         console.log("user",user)
         if(!user){
             return res.status(404).json({msg: "username does not exist"});
            }
            let match =  await bcrypt.compare(req.body.password, user.password);;
            
            if(match){
                
                const accessToken = jwt.sign(user.toJSON(), "jwt-access-token-secret-key", {expiresIn: '1h'} );
                const refreshtoken =  jwt.sign(user.toJSON(), "jwt-refresh-token-secret-key",{expiresIn: '7d'});

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


export { signup, login,getIndividual,checkUser }