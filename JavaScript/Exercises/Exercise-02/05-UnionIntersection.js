// // 5. Write​ ​ a ​ ​ JavaScript​ ​ program​ ​ to​ ​ compute​ ​ the​ ​ union​ ​of​ ​ two​ ​ arrays,​ ​ 
// // and​ ​ Write​ ​ a ​ ​ JavaScript function​ ​ to​ ​ find​ ​ the​ ​ difference​ ​ of​ ​ two​ ​ arrays,
// //  and intersection of two arrays.

function union(a,b){
    let newArr = a.slice();
    // if i directly change the value of array a then it will also change in original array
    // so thats why i am creating new copy of array a it will doesnt affect my original array
   for(let i = 0; i<b.length; i++){
    if(!newArr.includes(b[i])){
        newArr.push(b[i]);
    }
   } 
   return newArr;

    //  other app.
    // return [...new Set([...a, ...b])];
}
function interSection(a,b){
    let newArr = [];
    for(let i = 0; i<b.length; i++){
     if(a.includes(b[i])){
         newArr.push(b[i]);
     }
    } 
    for(let i = 0; i<a.length; i++){
        if(b.includes(a[i]) && !newArr.includes(a[i])){
            newArr.push(a[i]);
        }
       } 
    return newArr;

    // second approach
    // return a.filter(x => b.includes(x));
 }
 function seprate(a,b){
    let newArr = [];
    for(let i = 0; i<a.length; i++){
     if(!b.includes(a[i])){
         newArr.push(a[i]);
     }
    } 
    return newArr;

    // other
    // return a.filter(x => !b.includes(x));
 }


let a = [1,2,3,4];
let b = [3,4,22,6];

console.log(union(a,b));
console.log(a);  //unchanged
console.log(interSection(a,b));
console.log(seprate(a,b));
console.log(seprate(b,a));

