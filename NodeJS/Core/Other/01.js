var a=;
// let a = require("../practice.js")
function fun(){
    console.log("helo")
}
exports.fun = fun

 const myName = "Rahul"
 exports.myName = myName;
console.log(myName);

let http = require("http");

http.createServer(()=>{
    console.log("Working")
}).listen(3333);


console.log("hre",a);