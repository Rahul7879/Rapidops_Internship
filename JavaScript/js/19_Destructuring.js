// Array destructuring

// Important Points 
// we can use it with any iterable, not only arrays:
// Unwanted elements of the array can also be thrown away via an extra comma:
//  rest (...), return new array of remaining element

let arr = ['rahul','deepak','aditya','yash'];

let [first,second,third,,last = "friends"] = arr;
first = "annu";
console.log(first);
console.log(last)


// String Desttructuring 

let str = "rahul singh rajput";

let [firstName,,thirdName,extra] = str.split(" ");
console.log(firstName);
console.log(thirdName);
console.log(extra);

// Looping with entries

let obj = {
    name: "John",
    age: 30
  };

  // loop over the keys-and-values
  for (let [key, value] of Object.entries(obj)) {
    console.log(`${key}:${value}`); // name:John, then age:30
  }

//   it should also works on this 

let arrOfArr = [["rahul","rajput"],["deepak","gupta"],["mayank","patel"]];

for(let [firstName,lastName] of arrOfArr){
    console.log(firstName,lastName)
}


// Rest (...) Operator

arr = [1,2,3,4,5,6,7,8,9,10];
let [one,two,three,...rest] = arr;
console.log(rest[5]);
console.log(rest.length)


// Object Destructuring 

let newObj = {
    name: "Rahul",
    lastName: "Rajput",
    age: 22,
}

let {name,lastName,age} = newObj
console.log(name);


// Tasks

// 1 Destructuring assignment

let user1 = { name1: "John", years: 30};

let {name1,years:age1,isAdmin=false} = user1;

console.log( name1 ); // John
console.log( age1 ); // 30
console.log( isAdmin ); // false

// 2 The Maximal Salary

let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
  };
   let max = 0;
   let ans = "";
  for(let [key,value] of Object.entries(salaries)){
       if(max < value){
          max = value;
          ans = key;
       }
  }
  console.log(ans);

