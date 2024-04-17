const fs = require("fs");
const crypto = require("crypto")

let start = Date.now();
console.time();
// process.env.UV_TREADPOOL_SIZE = 2;
// console.log("hello");
// setTimeout(()=>{
//     console.log("in Timeout")
// },0)

// setImmediate(()=>{
//    console.log("in imidiate")
// })

// fs.readFile("text.txt","utf-8",(err,data)=>{
//     console.log(data,"filed read");
//     crypto.pbkdf2('password','salt1',100000,1024,"sha512",()=>{
//         console.log(`${Date.now()-start}ms passoword1`);
//     })
//     crypto.pbkdf2('password','salt1',100000,1024,"sha512",()=>{
//         console.log(`${Date.now()-start}ms passoword2`);
//     })
//     crypto.pbkdf2('password','salt1',100000,1024,"sha512",()=>{
//         console.log(`${Date.now()-start}ms passoword3`);
//     })
//     crypto.pbkdf2('password','salt1',100000,1024,"sha512",()=>{
//         console.log(`${Date.now()-start}ms passoword4`);
//     })
//     crypto.pbkdf2('password','salt1',100000,1024,"sha512",()=>{
//         console.log(`${Date.now()-start}ms passoword5`);
//     })
//     crypto.pbkdf2('password','salt1',100000,1024,"sha512",()=>{
//         console.log(`${Date.now()-start}ms passoword5`);
//     })
// })

// console.log("end");


// fs.readFile("text.txt","utf-8",(err,data)=>{
//     console.log(data,"filed read");
//     crypto.pbkdf2('password','salt1',100000,1024,"sha512",()=>{
//         console.log(`${Date.now()-start}ms passoword11`);
//     })
//     crypto.pbkdf2('password','salt1',100000,1024,"sha512",()=>{
//         console.log(`${Date.now()-start}ms passoword22`);
//     })
//     crypto.pbkdf2('password','salt1',100000,1024,"sha512",()=>{
//         console.log(`${Date.now()-start}ms passoword33`);
//     })
//     crypto.pbkdf2('password','salt1',100000,1024,"sha512",()=>{
//         console.log(`${Date.now()-start}ms passoword44`);
//     })
//     crypto.pbkdf2('password','salt1',100000,1024,"sha512",()=>{
//         console.log(`${Date.now()-start}ms passoword55`);
//     })
//     crypto.pbkdf2('password','salt1',100000,1024,"sha512",()=>{
//         console.log(`${Date.now()-start}ms passoword66`);
//     })
// })

for(let i = 0; i<100; i++){
    fs.readFile("4k.mp4",(err,data)=>{
        if(err){
            console.log("Error")
        }
       console.log(data);
       console.timeEnd();
       console.log(Date.now()-start,"ms");
    })

    // let fourk = fs.readFileSync("4k.mp4");

    console.log(i,Date.now()-start);
}

