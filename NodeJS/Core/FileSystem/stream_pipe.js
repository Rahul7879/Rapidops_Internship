const fs = require('fs');
console.time();
const readStream = fs.createReadStream('files/wrte1.mp4');
const writeStrean = fs.createWriteStream('files/videonewpipe.mp4');

// readStream.on('data', (chunk) => {
//   console.log('Received data chunk');
//   console.log(chunk);
//   writeStrean.write(chunk)
// });

// readStream.on('error', (err) => {
//   console.error(err);
// });

// readStream.on('end', () => {
//   console.log('Finished reading file');
//   console.timeEnd();
// });


readStream.on('data', (chunk) => {
    console.log('Received data chunk');
    // console.log(chunk);
    // writeStrean.write(chunk)
  });
  
  readStream.on('error', (err) => {
    console.error(err);
  });
  
  readStream.on('end', () => {
    console.log('Finished reading file');
    console.timeEnd();
  });
  readStream.on("pause",()=>{
    console.log("stream pause")
  })
  readStream.on("resume",()=>{
    console.log("stream resume")
  })
  readStream.on('open', (fd) => {
    console.log(`File opened successfully with file descriptor ${fd}`);
});

// Listen for the 'close' event
readStream.on('close', () => {
    console.log('Stream has been closed');
});

setTimeout(()=>{
console.log("hello")
},1)

setTimeout(()=>{
  console.log("hello1000")
  },5)

  setTimeout(()=>{
    console.log("hello500")
    },2)
    
  

  readStream.pipe(writeStrean);



// video test server 


// const http = require('http');
// const fs = require('fs');
// const path = require('path');

// const server = http.createServer((req, res) => {
//     const filePath = path.join(__dirname, 'video.mp4'); 

//     fs.stat(filePath, (err, stats) => {
//         if (err) {
//             if (err.code === 'ENOENT') {
//                 res.writeHead(404, {'Content-Type': 'text/plain'});
//                 res.end('Not Found');
//             } else {
//                 res.writeHead(500, {'Content-Type': 'text/plain'});
//                 res.end('Internal Server Error');
//             }
//             return;
//         }

//         res.writeHead(200, {
//             'Content-Type': 'video/mp4',
//             'Content-Length': stats.size
//         });

//         const readStream = fs.createReadStream(filePath);
//         readStream.pipe(res);

//         readStream.on('error', (streamErr) => {
//             res.writeHead(500, {'Content-Type': 'text/plain'});
//             res.end('Internal Server Error');
//             console.error(streamErr);
//         });
//     });
// });

// server.listen(3000, () => {
//     console.log('Server running on port 3000');
// });

