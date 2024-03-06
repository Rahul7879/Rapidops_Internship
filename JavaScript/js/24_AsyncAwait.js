const p1 = new Promise((resolve,reject)=>{
    setTimeout(()=>resolve("p1 resolve"),2000)
})
const p2 = new Promise((resolve,reject)=>{
    setTimeout(()=>resolve("p2 resolve"),5000)
})

async function fun(){
    console.log("Start");
    setTimeout(()=>console.log("setTimeOut 1 "),2000);
    console.log("after STO");
    let result1 = await p1;
    console.log("result1",result1);
    let result2 = await p2;
    console.log("result2",result2);
    setTimeout(()=>console.log("setTimeOut last "),1000);
}
fun();
