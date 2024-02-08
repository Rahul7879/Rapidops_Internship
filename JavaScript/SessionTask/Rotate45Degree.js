let data = +prompt("Enter Degree Multiple of 45");
data = data%360;
data/=45;
let arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

function Rotate(arr) {
    let topRight = 0;
    let bottomRight = arr.length-1;
    let topLeft = 0;
    let bottomLeft = arr.length-1;
    let tempArr = [arr[1][0]];
    let count = 0;

    while (topLeft < bottomLeft && topRight < bottomRight) {
        for (let i = topLeft; i < arr.length; i++) {
            tempArr.push(arr[topLeft][i])
            arr[topLeft][i] = tempArr[count];
            count++;
        }
        topRight++;
        for (let i = topRight; i < arr.length; i++) {
            tempArr.push(arr[i][bottomRight])
            arr[i][bottomRight] = tempArr[count];
            count++;
        }
        bottomRight--;
        for (let i = bottomRight; i >= topLeft; i--) {
            tempArr.push(arr[bottomLeft][i])
            arr[bottomLeft][i] = tempArr[count];
            count++;
        }
        bottomLeft--;
        for (let i = bottomLeft; i > topLeft; i--) {
            tempArr.push(arr[i][topLeft])
            arr[i][topLeft] = tempArr[count];
            count++;
        }
        // console.log(arr);
    }
}

while(data--){
    Rotate(arr);
}
console.log(arr);
alert(arr);

