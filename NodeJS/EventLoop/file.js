console.log("start");
const start = Date.now();

setTimeout(()=>{
    // for(let i = 0; i<10; i++){
    //    console.log("hello1")
    // }
    console.log("end", Date.now()-start);
},0)



let p1 = new Promise((res,rej)=>{
    setTimeout(()=>{
        res("promise resolved")
    },0)
})



p1.then((msg)=>{
    console.log(Date.now()-start,msg)
})