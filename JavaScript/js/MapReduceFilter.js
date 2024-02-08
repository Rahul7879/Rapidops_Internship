let arr = [1,2,3,4,5];
let output = arr.map((x)=> x.toString(2));
console.log(output);
console.log(arr);

// Filter 

let output2 = arr.filter(x=>x>4);
console.log(output2)

// Reduce  - Takes two parameter;

let out3 = arr.reduce((acc,x)=>{
   acc = acc+x;
   return acc;
},0)

console.log(out3);

let data = [{
    name: "rahul",
    surname: "rajput",
    age:22,
},
{
    name: "pintu",
    surname: "rajput",
    age:20,
},
{
    name: "annu",
    surname: "jha",
    age:23,
}]

let ans = data.filter((x)=> x.age > 22).map(x=>x.name+x.surname);
// let ans = data.reduce((x)=>{
    
// })
// console.log(ans);