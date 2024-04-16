var fs = require('fs');

let text =  fs.readFileSync("rahul.txt","utf-8");
console.log(text);

let newText = "currenly persuing B teck "

newText = text+newText;

fs.writeFileSync("hello.txt", newText);

let text2 =  fs.readFileSync("hello.txt","utf-8");
console.log("text2",text2);

fs.rename("hello.txt", "newHello.txt", (err,data)=>{
  console.log("File renamed");
})

fs.unlink("newHello.txt",(err,data)=>{
  console.log("Deleted")
})

fs.open("newHello.txt",(err,data)=>{
  console.log("opened")
})

console.log("working");

