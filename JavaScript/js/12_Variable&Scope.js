// function makeCounter() {
//     let count = 0;
  
//     return function() {
//       return count++;
//     };
//   }
  
//   let counter = makeCounter();
//   console.log( counter() );
//   //console.log(makeCounter()); 
//   console.log( counter() ); 
//   console.log( counter() ); 

  // Tasks

// let name = "John";
// function sayHi() {
//   console.log("Hi, " + name); // Pete
// }

// name = "Pete";
// sayHi();


// function makeWorker() {
//   let name = "Pete";

//   return function() {
//     console.log(name);
//   };
// }

// let name = "John";

// // create a function
// let work = makeWorker();

// // call it
// work(); // what will it show?

// function makeCounter() {
//   let count = 0;

//   return function() {
//     return count++;
//   };
// }

// let counter = makeCounter();
// let counter2 = makeCounter();

// console.log( counter() ); // 0
// console.log( counter() ); // 1
// console.log( counter2() ); // 0
// console.log( counter2() ); // 1

// let phrase = "Hello";

// if (true) {
//   let user = "John";
//   function sayHi() {
//     console.log(`${phrase}, ${user}`);
//   }
// }

// sayHi(); //it will throw an error bcz we cant call function out of scope 

// function check(a , b){
//   console.log(a);
//   return (d,c)=>{
//         console.log(d,b);
//         return (f)=>{
//           console.log(a,c,f);
//         }
//   }
// }
// check(1,2)(5,7)(9)

// function sum(a){
//   return (b)=>{
//     return a+b;
//   }
// }
// console.log(sum(2)(5)); //

// let x = 1;

// function func() {
//   console.log(x); //error 

//   let x = 2;
// }

// func();

// let arr = [1, 2, 3, 4, 5, 6, 7];

// function inBetween(start,end){
//    return (item)=>(item>= start && item <= end);
// }

// console.log( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

// function inArray(arr) {
//   return function(x) {
//     return arr.includes(x);
//   };
// }

// console.log( arr.filter(inArray([1, 2, 10])) ); // 1,2

