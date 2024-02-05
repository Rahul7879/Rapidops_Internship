
// 2. Write​ ​ a ​ ​ JavaScript​ ​ program​ ​ which​ ​ accepts​ ​ a ​ ​ number​​ as​ ​ input​ ​ and​ ​ insert​ 
// ​ dashes​ ​ (-) between​ ​ each​ ​ two​ ​ even​ ​ numbers.

let num = prompt("Enter Number");
let newStr = "";
for(let i = 0; i<num.length; i++){
   (+num[i]%2 == 0 && +num[i+1]%2 == 0) ? newStr+=num[i]+"-" : newStr+=num[i];
}
alert(newStr);