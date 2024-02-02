let arr = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
]
console.log(arr[0]);
console.log(arr[1]);
console.log(arr[2]);

// Method-01

let newarr = [];
for(let i = arr.length-1; i>=0; i--){
    let tempArr = [];
    for(let j = 0; j<arr[0].length; j++){
       tempArr.push(arr[i][j]);
    }
    newarr.push(tempArr);
}
arr = newarr;

// Method-02



console.log("after rotate");
console.log(arr[0]);
console.log(arr[1]);
console.log(arr[2]);
