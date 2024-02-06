// 3. Write​ ​ a ​ ​ JavaScript​ ​ program​ ​ to​ ​ find​ ​ the​ ​ most​ ​frequent​ ​ item​ ​ of​ ​ an​ ​ array.

let arr = [2,11,19,1,1,1,1,1,1,1,1,1,5,2,4];

arr.sort((a,b)=>a-b);
// The time complexity of array sort is browser dependent. In modern versions of chrome,
//  the time complexity of array sort will be O(n) whereas in firefox it is O(nlogn).
let element = 0;
let maxCount = 1;
let count = 1;
for(let i = 0; i<arr.length; i++){
    if(arr[i] == arr[i+1]){
        console.log(count);
        count++;
        if(count > maxCount){
            element = arr[i];
            maxCount = count;
        }
    }else{
        count = 1;
    }
}
console.log(`${element} is a most frequent with ${maxCount} frequency`)
