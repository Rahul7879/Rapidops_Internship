

let billion = 1000000000;
// We also can use underscore _ as the separator:
 billion = 1_000_000_000;

 billion = 7.4e9;
 console.log(billion);

 (7e4 == 700) ? console.log("Equal") : console.log("not equal");

//  same works in micro value 

(7e-6== 0.000007) ? console.log("Equal") : console.log("not equal")


// Number Methods 

let num = 3.4;
let num2 = -4.3;
let num3 = 3.9;

// Floor

console.log(Math.floor(num)); // 3
console.log(Math.floor(num2)); // -5 ************
console.log(Math.floor(num3)); // 3
 
// ceil (next greater);

console.log(Math.ceil(num)); // 4
console.log(Math.ceil(num2)); // -4 ************
console.log(Math.ceil(num3)); // 4

// round - 1.4 becomes 1 and 1.6 becomes 2

console.log(Math.round(num)); // 3
console.log(Math.round(num2)); // -4 ************
console.log(Math.round(num3)); // 4

// Trunc  ignore values after . both - and +

console.log(Math.trunc(num)); // 3
console.log(Math.trunc(num2)); // -5 ************
console.log(Math.trunc(num3)); // 3

// we have 1.2345 and want to round it to 2 digits, getting only 1.23.
let a = 1.23456
console.log(Math.floor(a*100)/100) // 1.23
console.log(Math.floor(a*1000)/1000) // 1.234

// second way 
console.log(a.toFixed(1)); // 1.2
console.log(a.toFixed(3)); // 1.234
console.log(a.toFixed(10)); // 1.2345600000


((0.1 + 0.2).toFixed(1) == 0.3) ? console.log(true) : console.log(false); //false
(0.1 + 0.2 == 0.3) ? console.log(true) : console.log(false); //false

let user = {
    name: "aushfdjsd",
    obj: {
        a: "ksjf",
    }
}

// let admin = user;
// admin.name = "hh";
// console.log(user.name);

let admin = object.assign(user);
admin.name = "hh";
console.log(user.name);








