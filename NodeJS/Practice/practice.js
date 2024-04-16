// (function(exports , require, module, __filename, __dirname){
//     const a = 10;
//     exports.a = a;
// })

// console.log(require);

// let a = require("./practice2.js")

// console.log(global.crypto);
// let name = "Rahul Singh Rajput";
// let fun = function(){
//     console.log("hello")
// }
// module.exports.name = name;
// module.exports.fun = fun;


// console.log(exports,"___________",module,"___________",require)


// let a = ()=>{
//     let a = 20;
//     (()=>{
//         console.log(a,b)
//     })()
// }
// (function(){
//     let b = 30;
//     a();
// })()

// console.log('Start');
// console.time();
// let start = Date.now();
// setTimeout(() => console.log('setTimeout1'), 0);

// setTimeout(() =>{
//     console.log('setTimeout2',console.timeEnd())
//     console.log(Date.now()-start)  
// }
// , 2000);
// setTimeout(() =>{
//     console.log('setTimeout33')
//     console.log(Date.now()-start)  
// }
// , 2000);
// setImmediate(() => console.log('setImmediate'));

// Promise.resolve().then(() => console.log('Promise'));
// let p1 = new Promise((res,rej)=>{
//     setTimeout(()=>{
//         res("Promise 2 Resolved")
//     },2000)
// })

// p1.then((ms)=>{
//     console.log(ms,Date.now()-start)
// })

// let p2 = new Promise((res,rej)=>{
//     setTimeout(()=>{
//         res("Promise 3 Resolved")
//     },0)
// })

// p2.then((ms)=>{
//     console.log(ms,Date.now()-start)
// })

// console.log('End');



const eventEmitter = require('events');

const myEmitter = new eventEmitter();

// myEmitter.setMaxListeners(1);


// myEmitter.on('myEvent', (data) => {
//     console.log(data);
// });

// myEmitter.on('myEvent', () => {
//     console.log('2');
// });

// myEmitter.emit('myEvent','Event Received');


// console.log(myEmitter);


// myEmitter.on('myEvent', () => {
//     console.log('This will not executed.');
// });



// myEmitter.on('myEvent', (data) => {
//     console.log(data, '- FIRST');
// });

// console.log('Statement A');

// myEmitter.on("myEvent", data => {
//     console.log(data, '- SECOND');
// });

// myEmitter.emit('myEvent', 'Emitted Statement');

// console.log("Statement B");

// myEmitter.on("myEvent", data => {
//     console.log(data, "- ON");
// });

// myEmitter.once("myEvent", data => {
//     console.log(data, "- ONCE");
// });

// myEmitter.emit("myEvent", "Emitted Statement");
// myEmitter.emit("myEvent", "Emitted Statement");
// myEmitter.emit("myEvent", "Emitted Statement");



// myEmitter.on("myEvent", data => console.log(data, "- ON"));
// myEmitter.on("myEvent2", data => console.log(data, "- ON"));
// myEmitter.once("myEvent3", data => console.log(data, "- ONCE"));

// console.log(myEmitter.eventNames());
// myEmitter.emit("myEvent3", 'EVENT');
// console.log(myEmitter.eventNames());

// console.log(myEmitter);


// function func1() {
//     console.log("EVENT TRIGGERED");
// }

// myEmitter.on("myEvent", func1);
// myEmitter.on("myEvent2", func1);

// console.log(myEmitter.eventNames());
// myEmitter.removeListener("myEvent", func1);
// console.log(myEmitter.eventNames());



const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
    // Main thread will spawn two workers
    const worker1 = new Worker(__filename);
    const worker2 = new Worker(__filename);

    worker1.on('message', message => console.log('Worker 1:', message));
    worker2.on('message', message => console.log('Worker 2:', message));

    worker1.on('exit', () => console.log('Worker 1 finished'));
    worker2.on('exit', () => console.log('Worker 2 finished'));
} else {
    // Worker threads execute the for loop
    for (let i = 0; i <= 100000; i++) {
        if (i % 10000 === 0) {  // Report progress every 10000 iterations
            parentPort.postMessage(`Progress: ${i}`);
        }
    }
    parentPort.close(); // Close the worker when done
}
