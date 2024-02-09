// Tasks

// 1. Sum all numbers till the given one

// using loop

//  function sumTo(num){
//     let sum = 0;
//     for(let i = 0; i<=num; i++){
//         sum+=i;
//     }
//     return sum;
//  }

// using recursion 

function sumTo(num){
    if(num == 1){
        return num;
    }
   return num+sumTo(num-1);
}

// using formula 

// function sumTo(n){
//     return n*(n+1)/2;
// }

console.log(sumTo(5));

// 2. Factorial 

// using loop

// function factorial(num){
//     let product = 1;
//     for(let i = 1; i<=num; i++){
//         product*=i;
//     }
//     return product;
// }

function factorial(num){
    if(num == 1){
        return num;
    }
    return num*factorial(num-1);
}

console.log(factorial(5));

// 3. Fibonacci Number 

// function fib(num){
//    let arr = [1,1];
//    let i = 0;
//    while(num > 2){
//     arr.push(arr[i]+arr[i+1]);
//     num--;
//     i++;
//    }
//    return arr[i+1]; 
// }

function fib(n) {
    return n <= 1 ? n : fib(n - 1) + fib(n - 2);
  }  // not good for big values 

console.log(fib(1))
console.log(fib(7)); // 5527939700884757