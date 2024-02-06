const myFunc = (b,c)=>{
    let a = 2;
    console.log("hello bhai");
    console.log(a+b+c);
    return ()=>{
        console.log(a+b);
        a++;
    };
}



// let id = setTimeout(myFunc,2000,5,10,66) //with argument

// setTimeout("alert('HEllo')",3000); // we can also do it

// cancelling the timeout

// clearTimeout(id);

// let interval = setInterval(myFunc,1000,4,6,3)

// setTimeout(()=>{
//     clearInterval(interval)
// },3000)

// other option using settimeout 

// setTimeout(function func(){
//     console.log("hello")
//       setTimeout(func,1000)
// },1000);


// Tasks


// function printNumbers(start,end){
//     let curr = start;
//     let timerId = setInterval(()=>{
//         console.log(curr);
//         if(curr == to){
//             clearInterval(timerId);
//         }
//         curr++;
//     },1000)
// }

// printNumbers(1,10);

function printNumbers(start,end){
    let curr = start;
    setTimeout(function fun(){
        console.log(curr)
        if(curr < end){
            setTimeout(fun,300);
        }
        curr++;
    },1000);
}

printNumbers(1,10);


// Task-02

var a = 1;

setTimeout(()=>{
    console.log(a);
},0)

for(let i = 0; i<3000000000; i++){
    a++;
}

