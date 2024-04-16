let fs = require("fs");
let text;

fs.readFile("files/file1.txt","utf-8",(err,result)=>{
    if(err){
      console.log("async read error")
      return ;
    }
    console.log("async read", result)
    text = result;
    fs.writeFile("files/file1.txt",result,(err,result)=>{
      if(err){
        console.log("async write error")
        return ;
      }
      console.log("async write", result)
    })
  })


  fs.readFile("files/video.mp4",(err,result)=>{
    if(err){
      console.log("async read error")
      return ;
    }
    console.log("async read", result)
    text = result;
    fs.writeFile("files/wrte1.mp4",result,(err,result)=>{
      if(err){
        console.log("async write error")
        return ;
      }
      console.log("async write", result)
    })
  })


let newText = "currenly persuing B teck "
newText = text+newText;
console.log(newText); //undeffinded


// video read 

