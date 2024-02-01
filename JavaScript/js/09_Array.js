// initialization 

// let users = ['rahul', 'deepak', 'rohit'];
let users = new Array("rahul", "rohit");

// console.log(users[0]);


// tasks

// when we copy array whats happen let see 

let users2 = users;

// console.log(users2); //same as users;

// but when we add new element in users2 it change the value of users because array works on refrench concept

users2.push("Deepak");
console.log(users); // value changed

// 2

let styles = ['Jazz', 'Blues'];
styles.push('Rock-n-roll')

styles[Math.floor(styles.length/2)] = "Classics";

styles.shift();
styles.unshift('Rap', 'Reggae');
console.log(styles);

let arr = ["a","b"];
arr.push(function (){
    console.log(this);
})
arr.push(()=>{
    console.log("hello rahul");
})
arr[2]();
arr[3]();
  
// 3

// function sumInput(){
//     let num;
//     let arr = [];
//     do{
//         num = +prompt("Enter Number");
//         arr.push(num);
//         if(num == 0){
//             break;
//         }
//         console.log(num);
//     }while(!isNaN(num));
//     let sum = 0
//     for(let i = 0; i<arr.length-1; i++){
//        sum+=arr[i];
//     }
//     return sum;
// }

// alert(sumInput());

// 4

// function getMaxSubSum(arr){
//     let maxSum = 0;
//     let tempSum = 0;
//    for(let i = 0; i<arr.length; i++){
//     tempSum+=arr[i];
//       if(tempSum < 0){
//         tempSum = 0;
//       }
//       maxSum = Math.max(maxSum,tempSum);
//    }
//    return maxSum;
// }

// console.log(getMaxSubSum([100, -9, 2, -3, 5]))
// console.log(getMaxSubSum([-2, -1, 1, 2]))


// ARRAY METHODS
  let newarr = new Array(1,3,5);
// push 
    newarr.push(5);
//  pop simple
    newarr.pop(); //removes last lement
    // shift - it removes element from beginning
    newarr.shift(0); //[3, 5 ]
    // unshift - add element from begining it can add multiple in one time 
    newarr.unshift(0);  //[  0, 3, 5 ]
    newarr.unshift(1,2); //[ 1, 2, 0, 3, 5 ]
    console.log(newarr);
 
    // splice 

    // array are object so we can delete elements by delete key word 

    delete newarr[1];
    // console.log(newarr); // [ 1, <1 empty item>, 0, 3, 5 ] length 5

    // but if we dont want to empty space so we can use splish method for overcome this problem

    newarr.splice(1,2);

    console.log(newarr);

    // we can also replace value 

    // from index -1 (one step from the end)
    // delete 0 elements,
    // then insert 3 and 4
    newarr.splice(-1, 0, 3, 4);
    
    console.log( newarr ); // [ 1, 3, 3, 4, 5 ]

    // method Slice 

    // it doesnt affects original array  returns new array

    console.log(newarr.slice(1,4));
    console.log( newarr ); // [ 1, 3, 3, 4, 5 ]

    // it can be also use for copying array 

    let copybyslicearr = newarr.slice();
    console.log(copybyslicearr);
    copybyslicearr[1] = 33;
    console.log(copybyslicearr);
    console.log(newarr);
    

    // concat 

 
    console.log(newarr.concat(8,3,2,[1,2,4]));

    // Iterate using forEach method

   newarr.forEach((item,index,arrayname)=>{
    console.log(`${item} item ${index} index ${arrayname} arrayname`);
   })

   // Index of 

   console.log(newarr.indexOf(4));
   console.log(newarr.lastIndexOf(3)); //last index



//    includes return true false if element present 

  console.log(newarr.includes(3)); //true
  console.log(newarr.includes(213)); //false

//   find method

let objusers = [
    {id: 1, name: "John"},
    {id: 2, name: "Pete"},
    {id: 3, name: "Mary"}
  ];
//   newarr.push(true);
//   let userr = newarr.find(item => item == 5);
    let userr = objusers.find(item => item.name == "Mary");
    console.log(userr); 
    // if nothing is find then it return undefined;
    let findIndexmethod = objusers.findIndex(item => item.id == 1);
    console.log(findIndexmethod); // 0
    // if we want to from last 
    objusers.push({
        id: 2,
        name: "John"
    });
    // let findLastIndexmethod = objusers.findLastIndex(item => item.id == 2);
    // console.log(findLastIndexmethod); // 0
    // console.log(objusers);

    // Filter Method

    // Filter methods return array of filtered items  but works same as find method

    // let filteredData = objusers.filter(item => item.id == 2);
    let filteredData = objusers.filter(function(item,index){
            return (item.id < 2);
    });

    // console.log(filteredData);

    // Map Method for changing orinal array values 

    let MappedArray = objusers.map((item)=>item.id*2)
    // with normal function 
    // let MappedArray = objusers.map(function(item,index,array){
    //     console.log("index-",index);
    //     console.log("array-",array);
    //     return item.id*2;
    // })

    console.log(MappedArray);

    // Sort Method 

    // function compareNumeric(a, b) {
    //     if (a > b) return 1;
    //     if (a == b) return 0;
    //     if (a < b) return -1;
    //   }
      
    // Sort and simple code for sorting

      let sortarr = [22, 1, 2, 15 ];
      sortarr.sort((a,b)=> a-b); // accending
      console.log(sortarr);
      sortarr.sort((a,b)=> b-a); // deccending
      console.log(sortarr);

    //   reverse 
     
    sortarr.reverse();
    console.log(sortarr);

    // split and join 

    let names = 'Bilibo, Gandialf, Nazigul';

 sortarr = names.split(',');

for (let name of sortarr) {
  console.log( `A message to ${name}.` ); // A message to Bilbo  (and other names)
}
console.log(sortarr);

// join for joing values in array

sortarr = sortarr.join('::');

for (let name of sortarr) {
  console.log( `A message to ${name}.` ); // A message to Bilbo  (and other names)
}
console.log(sortarr);

// Reduce Method 

sortarr = [1,2,3,4,5,6];

let sum = sortarr.reduce((sum,cur)=>sum+cur)
console.log(sum);




    
  

