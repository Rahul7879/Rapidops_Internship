let http = require("http");

http.createServer((req,res)=>{
    console.log(req,res)
    res.end("ok")
}).listen(9000,()=>{
    console.log("listening")
});