const arr = [1,2,3,4]

// function shuffleArray(arr){
//     let first = arr[0];
// for(let i = 0; i<arr.length-1; i++){
//   arr[i] = arr[i+1];
// }
// arr[arr.length] = first;
// }
// its rotating not suffling

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // Generate a random j from 0 to i
        [arr[i], arr[j]] = [arr[j], arr[i]];  // Swap elements at indices i and j
    }
    return arr;
}

shuffleArray(arr);
console.log(arr);
