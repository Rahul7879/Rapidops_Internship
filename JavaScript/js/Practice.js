// let str = "AbBcdD";
// let ans = "";

// for(let i = 0; i<str.length-1; i++){
//     if(str[i] !== str[i+1] && str[i] == str[i+1].toLowerCase()){
//         ans+=str[i]+"-"
//     }else{
//         ans+=str[i];
//     }
// }
// ans+=str[str.length-1]
// console.log(ans);

function FizBuz(num) {
    for (let i = 1; i <= num; i++) {
        // if(i%3 == 0 && i%5 == 0) console.log(i,"FizBuzz");
        // else if(i % 3 == 0) console.log(i,"fiz");
        // else if(i%5 == 0) console.log(i,"Bzz");

        (i % 3 == 0 && i % 5 == 0) ? console.log(i, "FizBuzz") : (i % 3 == 0) ? console.log(i, "fiz") : (i % 5 == 0) ? console.log(i, "Bzz") : console.log(i)
    }
}
// FizBuz(100);


function newfun() {
    let name = "rahul";
    let age = 22;

    console.log(this);
}

// let fun = function func() {
//     let a = 20;
//     let b = 50;
//     console.log("hello");
//     console.log(this.a);
//     console.log(this.b);
//     newfun();
// }


// fun()
function areTheNumbersAlmostEqual(num1, num2) {
    return num1 - num2;
}
console.log(areTheNumbersAlmostEqual(0.1 + 0.2, 0.3));



function fibo(number) {
    let a = 0;
    let b = 1;
    let temp;
    if (number === 1) {
        return a + b;
    } else {
        for (let i = 2; i <= number; i++) {
            temp = a + b;
            a = b;
            b = temp
        }
        return temp;
    }


}
console.log(fibo(5))

let obj = {
    name: "Rahul",
    surname: "Rajput",
}
let newObj = {...obj};
// let newObj = JSON.parse(JSON.stringify(obj))
// let newObj = Object.assign({},obj)


newObj.name = "Annu"
console.log(obj.name);
console.log(newObj.name);

let arr = [1,2,3,4,5,6,7];

let newArr = [...arr];
newArr[0] = 11;
console.log(arr);
console.log(newArr);



// for(let i = 0; i<5; i++){
//     for(let j = 0; j<5; j++){
//         if(i == j+2 || i+2 == 5-j-1 || i+2 == j|| j+2==5-i-1) {
//             document.write(" * ")
//         }else{
//             document.write(" _ ")
//         }
//     }
//     document.write("<br>")
// }
// let size = 51;
// let half = Math.floor(size/2);

// for (let i = 0; i < size; i++) {
//     for(let j = 0; j<size; j++){
//                 if(i == j+half || i+half == j || i+half == size-j-1 || i == size-j-1+half) {
//                     document.write(" * ")
//                 }else{
//                     document.write(" _ ")
//             }
//         }
//         document.write("<br>");
// }

this.b = 50;
let fun = function func() {
    let a = 20;
    let b = 50;
    console.log("hello");
    console.log(this.a);
    console.log(this.b);
}
fun();

let str = "My name is Rahul Singh Rajput";
let obj1 = {};
for(let s of str){
    obj1[s] = (obj1[s] || 0)+1;
  }

  console.log(obj1);

  let mystr = "hello Javascript";
  let tempStr = "";

//   for(let ch of mystr){
//     if(ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u'){
//        tempStr+=ch;
//     }
//   }
//   let i = tempStr.length-1;
//   let ans = "";
//   for(let ch of mystr){
//     if(ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u'){
//        ans+=tempStr[i];
//        i--;
//     }else{
//         ans+=ch;
//     }
//   }
let start = 0;
let end = mystr.length-1;
let fromStart = "";
let fromLast = "";


function isVowel(ch){
    if(ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u'){
             return true;
    }
            return false;
    }

while(start < end){
    if(mystr)
    if(isVowel(mystr[start] && isVowel(mystr[end]))){
        fromLast+=mystr[start];
        fromStart+=mystr[end];
    }else if(isVowel(mystr[start])){
        fromLast+=mystr[end];
        end--;
    }else if(isVowel(mystr[end])){
        fromStart+=mystr[start];
        start++;
    }else{
        fromLast+=mystr[start];
        start++;
        fromStart+=mystr[end]
        end--;
    }
}


  console.log(fromStart+fromLast);


  let arr12 = [0,1,1,1,1,1,1,1,0,1];
  let maxCos = 0;
  let ans = 0;

  for(let i = 0; i<arr12.length; i++){
    if(arr12[i] == 0){
        let j = i-1;
        let leftCount = 0;
        let rightCount = 0;
        while(j>=0 && arr12[j] != 0){
            leftCount++;
            j--;
        }
        j = i+1;
        while(j<arr12.length && arr12[j] != 0){
            rightCount++;
            j++;
        }

        if(maxCos < leftCount+rightCount){
            maxCos = leftCount+rightCount;
            ans = i;
        }
    }
  }
  console.log(ans);
//   arr12 = [1,2 , 3 , 4, 5, 6 ,7 ];
// //   let prevLen = arr12.length;
//   arr12.splice(3,0,arr12[4]);
//  console.log(  arr12.splice(5,1) ); 
// //   arr12.length = prevLen;
// console.log(  arr12.shift() );
//   console.log(arr12);

// question 2

let arr13 = [2,3,4,5,6,7];
while(arr13.length > 1){
    let newArr13 = [];
    for(let i = 0; i<arr13.length-1; i++){
        newArr13.push(arr13[i]+arr13[i+1]);
    }
    arr13 = newArr13;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
}
console.log(arr13);


let arr15 = [1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,0,1,1];
let maxVal = 0;
let prevCount = 0;
let nextCount = 0;
let ind = 0;
for(let i = 0; i<arr15.length; i++){
    if(arr15[i] == 0){
        let ans = i;
        prevCount = nextCount;
        nextCount = 0;
        while(arr15[i+1] != 0 && i<arr15.length){
            i++;
            nextCount++;
        }
        if(maxVal < prevCount+nextCount){
            maxVal = prevCount+nextCount;
            ind = ans;
        }
        prevCount = nextCount;
    }else{
        prevCount++;
    }
}
console.log(ind);


if(true){
    function hello(){
        console.log("heall");
    }
}
hello();