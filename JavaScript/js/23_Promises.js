// Callback hell 

// when lots of function are depenedent of other function this shnerio will 
// create callback hell

// Issues with Callback 

// 1. Callback hell 
// 1. Inversion of Control(loosing control);

const cart = ['shoes','shirt','mobile'];

let pr = createOrder(cart);

pr.then((mess)=>{
    console.log("Thank You",mess)
    return mess;

})
.then((orderId)=>{
   return proceedToPayment(orderId)
}).then((orderId)=>{
    console.log("Thank You ",orderId)
}).catch((err)=>{
    console.log(err,"here is error");
}
)

function createOrder(cart){
    return new Promise((resolve,reject)=>{
        let orderId = "423";
        setTimeout(()=>{
            if(!isValidate()){
                resolve(orderId);
            }else{
                reject(orderId);
            }
        },5000)

    })
}

function proceedToPayment(orderId){
    console.log(orderId);
    return new Promise((resolve ,reject)=>{
        console.log("inproceedToPayment for 2s",orderId)
        let bill = "2999"
        setTimeout(()=>{
           if(isValidate()){
            resolve(bill);
           }else{
             reject(bill)
           }
        },5000)
    })
}

function isValidate(){
    return true;
}





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

// function delay(ms) {
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//            resolve();
//         },ms)
//     })
//   }
  
//   delay(3000).then(() => console.log('runs after 3 seconds'));


// JavaScript.Info


// new Promise((resolve, reject) => {
//     setTimeout(() => resolve("value"), 2000);
//   })
//   .then(result => console.log(result))
//   .finally(() => console.log("Promise ready")) // triggers first



// *************************<==>***************************


let p1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        // resolve("Promise 1 resolved");
        reject(("Promise 1 rejected"))
    },3000)
})
let p2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        // resolve("Promise 2 resolved")
        reject(("Promise 2 rejected"))
    },6000)
})
let p3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("Promise 3 resolved")
        // reject(("Promise 3 rejected"))
    },10000)
})

console.log("Promise.all")

// in Case of all resolved
// -- take max time of all promises to give result
//  gives array of all promises result

// in case of any of rejected
// ----- it will throw an error(result) as soon as possible (minimum time of rejected promise)
// -- it gives only first rejected result

// Promise.all([p1,p2,p3]).then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.error(err);
// })

// console.log("Promise.allSettled")

// in Case of all resolved
//  -- same as Promise.all

// in case of any of rejected
//  -- takes max time of all promises and gives array of status of all promises
// -- means if any of fail it doesnt affect any other promise 
// i think there is no need of catch bcz every time willl resolve

// Promise.allSettled([p1,p2,p3]).then((res)=>{
//     console.log(res)
// }).catch((res)=>{
//     console.log("hello",res);
// })

// console.log("Promise.race");
// it gives value of promise not an array 
// in this promise there is race of result , no matter what will will the result
// result can be fullfiledd or reject matters only which one response first


// Promise.race([p1,p2,p3]).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.error(err);
// })

// console.log("Promise.any");

// Promise.any is same as race but it waits for resolve 
// if any case all of will fail then it will give aggregate error
// (aggegate error gives object of all error )
// now it not working in node.js might be lower version of node 

Promise.any([p1,p2,p3]).then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.error(err);
    console.log(err.errors)
})

