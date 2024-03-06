console.log("Start");
// var count = 0;
// a(count);
// function a(count){
//     console.log("a",count++);
//     console.log("a",count++);

let p1 = new Promise((res,rej)=>{
    setTimeout(()=>res(),1500)
    console.log("wjd")
});
p1.then(()=>console.log("works"))
setTimeout(()=>console.log("sto"),1500)

// }
// console.log("mid",count)


// console.log(window)

let date = new Date();
let start = date.getTime();
let end = start
while(start+3000 > end){
    end = new Date().getTime()
}
console.log("End");