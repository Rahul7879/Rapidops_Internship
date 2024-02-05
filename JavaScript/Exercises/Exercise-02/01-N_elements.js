// 1. Write​ ​ a ​ ​ JavaScript​ ​ function​ ​ to​ ​ get​ ​the​ ​ first​ ​ and​ ​ last​ ​ element​ ​ of​ ​ an​ ​ array.
// ​ ​ Passing​ ​ a parameter​ ​ 'n'​ ​ will​ ​ return​ ​ the​ ​ first​ ​ 'n'​ ​ elements​ ​ of​ ​ the​ ​ array
// ​ ​ and​ ​last​ ​ ‘n’​ ​ elements​ ​ of​ ​ the array.

const arr = [1,2,3,4]

function getElements(n){
   let tempArr = [];
   for(let i = 0; i<n; i++){
    tempArr.push(arr[i]);
   }
   for(let i = n; i>0; i--){
    tempArr.push(arr[arr.length-i]);
   }
   return tempArr;
}
console.log(getElements(2));

// method -02 

function getElements1(n){
   let tempArr = [];
   tempArr =  arr.slice(0,n);
   tempArr = tempArr.concat(arr.slice(-n))
   return tempArr;
}
console.log(getElements1(2));

