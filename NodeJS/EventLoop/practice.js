const { readFileSync } = require("fs");

let start = Date.now();
console.log("start",Date.now()-start);
for(let i = 0; i<1000; i++){
    console.log("in loop")
}
console.log(Date.now()-start);
let a = readFileSync("./html.html","utf-8")


setTimeout(()=>{
console.log("in sto1",Date.now()-start);  
},0)

Promise.resolve(console.log("in promise1",Date.now()-start));

let p2 = new Promise((res,rej)=>{
    setTimeout(()=>{
        console.log("in promise2",Date.now()-start);
        res();
    },0)
})

setImmediate(()=>{
    console.log("in setimidiate",Date.now()-start);  
    })
console.log("end",Date.now()-start);
