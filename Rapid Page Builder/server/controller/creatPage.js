import pageModel from "../model/pages.js"

 const createPage =   (req,res)=>{
    const newUser = new pageModel({
        title: req.body.title,
        subtitle: req.body.subtitle,
        body:req.body.body,
        isdraft: req.body.isdraft
    })

     newUser.save().then(()=>{
        res.send({code: 300, message : "Signup Successfully"})
    })
    .catch((err)=>{
        console.log(err);
        res.send({code: 501, message : "SignUp Error!"})
    })
}

export {createPage};