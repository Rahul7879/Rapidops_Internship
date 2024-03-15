import pageModel from "../model/pages.js"

 const createPage =   (req,res)=>{
    console.log(req.body);
    const newUser = new pageModel({
        email:req.body.email,
        title: req.body.title,
        subtitle: req.body.subTitle,
        body:req.body.body,
        isdraft: req.body.isDraft,
        ishide: req.body.isHide,
    })

     newUser.save().then((result)=>{
        console.log(result)
        res.send({code: 200, message : "page saved "})
    })
    .catch((err)=>{
        console.log(err);
        res.send({code: 501, message : "not created"})
    })
}

export {createPage};