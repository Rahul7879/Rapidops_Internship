const http = require("http");
const fs = require("fs");

// console.log(http);

// creating server instance using http.createServer 
const writeStream = fs.createWriteStream("./video.mp4");
const server = http.createServer((req,res)=>{
    // console.log('Request Headers :>> ', req.headers);
    // console.log('Request Method :>> ', req.method);
    // console.log('Request URL :>> ', req.url);
    // res.end('Thank you Mario, but our princess is in another castle...');
    const bodyStream = [];

    if(req.url == "/" && req.method == "GET"){

    }else if(req.url == "/contact" && req.method == "De"){

    }

    req.on('data', (chunk) => {
        console.log("chunk",chunk)
      bodyStream.push(chunk);
      writeStream.write(chunk)
    })
    .on('end', () => {
      console.log('Request body collected!');
      console.log(bodyStream.toString())
    });
})

server.listen(3000,()=>{
    console.log("listening")
})


// Http : 

// Node.js HTTP module is a built-int module that allow developers to create we servers ,
// as well as communicate with other API using HTTP 1.1 . HTTP , and HTTPS 

// Architecture :

// The HTTP module extends two built-in classes

// 1. Net module - Provides network api for creating stream-based TCP servers or clients 
// 2. Events Module - Provides an event-driven architecture using Event Emitter class .

// ** Both of these working in a non-blocking manner 

// Response 

// Request 


// https://mirzaleka.medium.com/a-detailed-look-into-the-node-js-http-module-680eb5e4548a
