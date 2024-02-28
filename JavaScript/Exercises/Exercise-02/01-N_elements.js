// 1. Write​ ​ a ​ ​ JavaScript​ ​ function​ ​ to​ ​ get​ ​the​ ​ first​ ​ and​ ​ last​ ​ element​ ​ of​ ​ an​ ​ array.
// ​ ​ Passing​ ​ a parameter​ ​ 'n'​ ​ will​ ​ return​ ​ the​ ​ first​ ​ 'n'​ ​ elements​ ​ of​ ​ the​ ​ array
// ​ ​ and​ ​last​ ​ ‘n’​ ​ elements​ ​ of​ ​ the array.

const arr = [1,2,3,4]

function getElements(n){
   let FirstElements = [];
   let lastElements = [];
   for(let i = 0; i<n; i++){
      FirstElements.push(arr[i]);
   }
   for(let i = n; i>0; i--){
    lastElements.push(arr[arr.length-i]);
   }
   return `First ${n} Elements: [${FirstElements}], Last ${n} Elements: [${lastElements}]`;
}
console.log(getElements(2));

// method -02 

function getElements1(n){
   FirstElements =  arr.slice(0,n);
   lastElements = arr.slice(-n)
   return `First ${n} Elements: [${FirstElements}], Last ${n} Elements: [${lastElements}]`;
}
console.log(getElements1(2));

