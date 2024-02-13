// Callback hell 

// when lots of function are depenedent of other function this shnerio will 
// create callback hell

// Issues with Callback 

// 1. Callback hell 
// 1. Inversion of Control(loosing control);

// const cart = ['shoes','shirt','mobile'];

// createOrder((cart,function(orderid){
//     makePayment(orderid,function())
// }))




// function getData(com){
//     return new Promise((resolve ,reject)=>{
//          setTimeout(()=>{
//             console.log("fullfilled",com);
//             resolve("successfully resolved");
//             // console.log("rejected  ksad");
//             // reject("reject messae");

//          },4000)
//     }
//     )
// }
// let prom = getData("200");
// console.log(prom);

// Then Catch 

// if promise will resolve then then works 
// if promise will reject then .cathch works 

// prom.then((res)=>{
//     //  console.log("Resolve by me",res)
//     return getData("300")
// }).then((res)=>{
//     console.log("end")
// })

// prom.catch((res)=>{
//     console.log("reject by me ", res)
// })

// Promise chain 




// Tasks 

// 2 Delay with a promise

function delay(ms) {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
           resolve();
        },ms)
    })
  }
  
  delay(3000).then(() => console.log('runs after 3 seconds'));
