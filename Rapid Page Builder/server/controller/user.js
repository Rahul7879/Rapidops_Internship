import userModel from "../model/user.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


 const signup =  (req,res)=>{
    console.log("hello");
    userModel.findOne({email:req.body.email}).then( async (result)=>{
        console.log(result);
      if(result){
       return res.send({code: 401, message : "Email already in use"})
      }else{
        const token = jwt.sign({name:req.body.email},"hellomynameisrahulsinghrajputfrombhopal")
        const hasspassword =  await bcrypt.hash(req.body.password,10).then((result));
        const newUser = new userModel({
        email: req.body.email,
        password: hasspassword,
        newsletter:req.body.newsletter,
        token:token,

    })
    newUser.save().then(()=>{
        res.send({code: 200, message : "Signup Successfully"})
    })
    .catch((err)=>{
        console.log(err);
        res.send({code: 501, message : "SignUp Error!"})
    })
}
})
}

async function compare(userPass, hashPass) {
    const match = await bcrypt.compare(userPass, hashPass);
    console.log("matching", match);
    return match;
}

const login = (req, res) => {
    userModel.findOne({ email: req.body.email })
    .then(async (result) => {
        if (!result) {
             res.send({ code: 501, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(req.body.password, result.password);;
        console.log(isMatch);
        if (isMatch) {
            // Passwords match
             res.send({ code: 200, message: "User found" });
        } else {
            // Passwords do not match
             res.send({ code: 404, message: "Wrong password" });
        }  
    }).catch((err) => {
        console.error(err); // It's a good practice to log the error for debugging.
        res.status(500).send({ code: 501, message: "Server error" });
    });  
}

export {signup , login}