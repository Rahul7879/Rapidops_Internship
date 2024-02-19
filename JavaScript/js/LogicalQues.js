// // 1. print duplicate elements

// let arr = [1,2,5,4,5,6,5,5,7,1,3,2];

// // method-1  (not passes test case more then two copies)
// let dupArr = arr.filter((el,index,arr)=>arr.indexOf(el) !== index);
// console.log(dupArr);

// // method-2
// dupArr = [];
// let i = 0;
// arr.forEach((el)=>{
//     if(arr.indexOf(el) !== arr.lastIndexOf(el) && arr.indexOf(el) == i){
//         dupArr.push(el);
//     }
//     i++;
// })
// console.log(dupArr);

// // 2. Max Min of Array using reduce 

// let arr = [2,4,5,6,4,1,-1];

// // method-1

// let max = arr.reduce((max,el)=>{
//     return (max < el) ? el : max;
// })
// let min = arr.reduce((min,el)=>{
//     return (min > el) ? el : max;
// })
// console.log(max);
// console.log(min);

// 3. Second largest in Array 

// - using sort 



