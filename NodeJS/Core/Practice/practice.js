// console.log(JSON.stringify(this));

// console.log(global.process);

// global.setInterval(()=>{
//     console.log("hello")
// },1000)

// let obj = {
//     name : "rahul",
//     get(){
//         console.log(this.name);
//     }
// }

// obj.get();

console.log('First');

setTimeout(() => {
  console.log('Second');
}, 0);

setImmediate(() => {
  console.log('Third');
});

console.log('Fourth');

process.nextTick(() => {
  console.log('Fifth');
});