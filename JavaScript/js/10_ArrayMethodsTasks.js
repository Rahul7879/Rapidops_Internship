// Task-01 Translate border-left-width to borderLeftWidth

// Method-01

// function camelize(str){
//     let newStr = "";
//     for(let i = 0; i<str.length; i++){
//          if(str[i] == '-'){
//             i++;
//             newStr+=str[i].toUpperCase();
//          }else{
//              newStr+=str[i];
//             }
//             console.log(str[i]);
//     }
//     return newStr;
// }

// Method-02

// function camelize(str){
//     let newStr = "";
//     newStr = str.split('-').map((word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1)).join("");
//     return newStr;
// }
// console.log(camelize('hello-rahul'));


// Task -02 Filter range

// let arr = [5, 3, 8, 1];

// function filterRange(arr, start, end) {
//     let newarr = arr.filter((item) => (item <= end && item >= start));
//     return newarr
// }

// filterRange(arr, 1, 4);

// console.log(arr);
// console.log(filtered); // 3,1 (matching values)

//  Task-03 Filter range "in place"


// let arr = [5, 3, 8, 1];

// const filterRangeInPlace = (arr,start, end)=>{
//      arr = arr.filter((item) => (item <= end && item >= start))
//      return arr;
// }
// arr = filterRangeInPlace(arr, 1, 4); // removed the numbers except from 1 to 4
// console.log( arr ); // [3, 1]


// Task-4 Sort In Decreasing Order

// let arr = [5, 2, 1, -10, 8];
//  arr.sort((a,b)=>b-a);
// console.log( arr ); // 8, 5, 2, 1, -10

// Task-5 Copy and sort array 

// let arr = ["HTML", "JavaScript", "CSS"];

// function copySorted(arr){
//     arr = arr.slice().sort();
//     return arr;
// }

// let sorted = copySorted(arr);

// console.log( sorted ); // CSS, HTML, JavaScript
// console.log( arr ); // HTML, JavaScript, CSS (no changes)

// Task-6 Create an extendable calculator

//   Task-07 Map to Names 

// let users = [ 
//     { name: "John", age: 25 },
//     { name: "Pete", age: 30 },
//     { name: "Mary", age: 28 },
//  ];

//  let names=[];
// let names = []
//  users.forEach(element => names.push(element.name));

// let names = users.map((item)=>item.name)

// console.log( names ); // John, Pete, Mary

// Task-08  map to object 

// let john = { name: "John", surname: "Smith", id: 1 };
// let pete = { name: "Pete", surname: "Hunt", id: 2 };
// let mary = { name: "Mary", surname: "Key", id: 3 };

// let users = [ john, pete, mary ];

// let usersMapped = users.map((item)=>({
//     fullName: item.name+" "+item.surname,
//     id: item.id
// }))

// console.log( usersMapped[0].id ) // 1
// console.log( usersMapped[0].fullName ) // John Smith

// function sortByAge(arr) {
//     arr.sort((a, b) => a.age - b.age);
//     // by name
//     //    arr.sort();
//   }
  
//   let john = { name: "John", age: 25 };
//   let pete = { name: "Bete", age: 30 };
//   let mary = { name: "Mary", age: 28 };
  
//   let arr = [ pete, john, mary ];
  
//   sortByAge(arr);
  
//   // now sorted is: [john, mary, pete]
//   console.log(arr[0].name); // John
//   console.log(arr[1].name); // Mary
//   console.log(arr[2].name); // Pete

// Task-10 GetAverage 

// let john = { name: "John", age: 2 };
// let pete = { name: "Pete", age: 3 };
// let mary = { name: "Mary", age: 2 };

// let arr = [ john, pete, mary ];

// function getAverageAge(arr){
//     let avg = 0;
//     arr.map((item)=>{
//         avg+=item.age;
//     })
//     return (avg/arr.length).toFixed(2);
// }

// console.log( getAverageAge(arr) ); 2.33

// Task-11 

// function unique(arr) {
//     let str = ""+arr[0];
//     let newarr = [];
//     newarr.push(str);
//     for(let i = 1; i<arr.length; i++){
//         if(str.includes(arr[i])){
//             continue;
//         }else{
//              newarr.push(arr[i]);
//              str+=arr[i];
//         }
//     }
//     return newarr;

//   }
  
//   let strings = ["Hare", "Krishna", "Hare", "Krishna",
//     "Krishna", "Krishna", "Hare", "Hare", ":-O"
//   ];
  

// console.log(unique(strings));

// Task-12

// let users = [
//     {id: 'john', name: "John Smith", age: 20},
//     {id: 'ann', name: "Ann Smith", age: 24},
//     {id: 'pete', name: "Pete Peterson", age: 31},
//   ];
  
//   function groupById(array) {
//     return array.reduce((obj, value) => {
//       obj[value.id] = value;
//       return obj;
//     }, {})
//   }

//   let usersById = groupById(users);

//   console.log(usersById);
