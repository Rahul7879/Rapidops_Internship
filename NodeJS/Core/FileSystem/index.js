// watcher 

const fs = require('fs');

// Watch for changes in a file
// const watcher = fs.watch('files', { persistent: true, encoding: 'utf8' });
// fs.watchFile('files/new.txt', {persistent:true, encoding:"utf8",interval:1},(curr,prev)=>{
//     console.log("fired")
//     fs.unwatchFile("files/new.txt");
// })

// // Listen for 'change' events
// watcher.on('change', (eventType, filename) => {
//     console.log(`File ${filename} changed`);
//     console.log(`Event type: ${eventType}`);
// });

// // Listen for 'error' events
// watcher.on('error', (error) => {
//     console.error('An error occurred:', error);
// });

// watcher.on('change', (eventType, filename) => {
//     console.log(`File ${filename} changed`);
//     console.log(`Event type: ${eventType}`);
// });

// // Listen for 'error' events
// watcher.on('error', (error) => {
//     console.error('An error occurred:', error);
// });


// fs.stat("files/file1.txt",(err,stat)=>{
//     console.log("jello",stat)
// })

// fs.readdir("files",(err,data)=>{
//     console.log(data)
// })

// fs.access("files/new.txt",fs.constants.F_OK,(err)=>{
//     console.log("exits");
// })

fs.chmod("files/new.txt",0o777,(err)=>{
    if(err){
        console.log(err);
    }
    console.log("all permissions")
    
})
fs.access("files/new.txt",fs.constants.R_OK,(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("removed");
})