// 31/01/24

// 1. [31/01 14:31] Princy Bhalu

let arr = [1 ,2 ];
let newarr = arr ;
let newarr1 = [10 , 20];
arr[1] = 10 ;
// in this case we changing values of array 
console.log(newarr);
arr = newarr1;
// in this case we changing reference of array 
console.log(arr);
console.log(newarr);



// 2.  How it is inserting 3,4 before 5 ? as we do arr.at(-1) it will print 5.
let arr2 = [1, 2, 5];
arr2.splice(-1, 0, 3, 4);
console.log( arr2 ); 
// 1,2,3,4,5

// when we can also take index from index last as in minus value but its start from 1 not 0


function filterRangeInPlace(arr , a , b){
    let newArr = arr.filter(
    (item , index) => {
    if(item >= a && item <= b)
    return true;
    else return false; });
    arr = newArr ;
    }
    arr = [5, 3, 8, 1];
    filterRangeInPlace(arr, 1, 4);
    console.log( arr );

    // it prints original bcz when we passes array as  parameter then it creates
    // new array of same name in, bcz of this new array we are not able to change the values
    // of original array, if we will not pass the array as parameter then we will be able to
    // change values of original array.

    // 01/02/2024

    // 1 How sort works behind the scene

    function mySort(arr , fn) {
        for(let i=0; i< arr.length;i++) {
            for(let j=0; j< arr.length -1; j++) {
                if(fn(arr[j] , arr[j+1])) {
                    let temp = arr[j];
                    a[j] = a[j+1];
                    a[j+1] = temp
                }   
            }
        }
        return arr
    };
     
     
    let a = [3,6,11,2, 1];
    console.log(mySort(a , (a,b) =>  a - b > 0 ? true : false))

    // 02/02/2024

    // 1. [01/02 16:03] Princy Bhalu

let phrase = "Hello";
 
if (true) {
  let user = "John";
 
  function sayHi() {
    console.log(`${phrase}, ${user}`);
  }
}
 
sayHi();

// but 

let value = "Surprise!";
 
function f() {
  let value = "the closest value";
 
  function g() {
    console.log(value);
  }
 
  return g;
}
 
let g = f();
g();