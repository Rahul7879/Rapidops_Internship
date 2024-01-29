console.log("8"-"3"); // 5
console.log("8"*"3"); // 24
console.log("8"/"2"); // 4
console.log("8"+"3"); // 83 // different only in addtion

console.log( Number("   123   ") ); // 123
console.log( Number("123z") );      // NaN (error reading a number at "z")
console.log( Number(true) );        // 1
console.log( Number(false) );       // 0
let unde;
console.log(Number(unde)) // Nan
let nullval = null;
console.log(Number(nullval)) // 0

// Boolean conversion--

// The conversion rule 
// Values that are intuitively “empty”, like 0, an empty string, null, 
// undefined, and NaN, become false, Other values become true.

console.log( Boolean(1) ); // true
console.log( Boolean(0) ); // fconsole.log
console.log( Boolean("hello") ); // true
console.log( Boolean("") ); // false
console.log( Boolean("0") ); // true **********

console.log('1' + 2 + 2); // "122" and not "14"

console.log(false+true);

console.log("" + 1 + 0)
console.log("" - 1 + 0)
console.log(true + false)
console.log(6 / "3")
console.log("2" * "3")
console.log(4 + 5 + "px")
console.log("$" + 4 + 5)
console.log("4" - 2)
console.log("4px" - 2)
console.log("  -9  " + 5)
console.log("  -9  " - 5)
console.log(null + 1)
console.log(undefined + 1)
console.log(" \t \n" - 2)

let i = 3;
while(i){
    console.log(--i);
}

// mutiple ternary operator

let age = 2300;

let message = (age < 3) ? 'Hi, baby!' :
  (age < 18) ? 'Hello!' :
  (age < 100) ? 'Greetings!' :
  (age > 1000) ? 'you are from marvels family' :
  'What an unusual age!';

console.log( message );