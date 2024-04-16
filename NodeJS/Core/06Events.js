const EventEmitter = require("events");
const myEmitter = new EventEmitter();
console.log(myEmitter);

myEmitter.on("click",()=>{
    console.log("clicked")
})
myEmitter.emit("click");