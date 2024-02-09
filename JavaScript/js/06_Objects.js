// An empty object (“empty cabinet”) can be created using one of two syntaxes:

let user = new Object(); // "object constructor" syntax
let user1 = {};
let str = "helo"  // "object literal" syntax

console.log(typeof(user)) // pbject

user = {
    name: "Rahul Singh Rajput",
    age: 22,
}

console.log(user.name , user.age);

// we can also add values 

user.gender = "Male";

console.log(user);
console.log(user.gender); //added


// also we can delete pairs

delete user.age;
console.log(user); //age removed

// we can also make key name spaces but by using "";

 user["City , State"] = "Bhopal MP";

console.log(user);

// same of delete

delete user["City , State"];  //spacs not igored
console.log(user);

let fruit = 'apple';

user[`${fruit}Computers`] =  5 // bag.appleComputers = 5

console.log(user);

console.log(user.appleComputers);

function makeUser(name , age){
    return{
    //     name: name,
    //     age: age,

    // better way

    name,
    age,
    }
}

let newuser= makeUser("Rahul Singh rajput", 25);
console.log(newuser)

// we can use any word for making object there is not reserved any word;

// for checking key is available or not in object so do like this 

if(user.name === undefined){
    console.log("Not available") }
    else {
        console.log("available");
    }

    (user.blabla === undefined) ? console.log("Not available") : console.log("available");


    // bettter way

    ("name" in user) ? console.log(" available in") : console.log(" not available in");


    // For in Object 

    user.address = "Bhopal";
    user["10"] = "A";
    user["1"] = "B";
    user["14"] = "C";
    user["2"] = "d";

    console.log(user);

    for(let key in user){
        console.log(key);
        console.log(user[key]);
    }

    // if we want in our sequence 
    user["+10"] = "A";
    user["+1"] = "B";
    user["+14"] = "C";
    user["++2"] = "d";

    console.log("specfic", user["2"])
    console.log("specfic", user["++2"])


    for(let key in user){
        console.log(+key);  // + is necessory ************
        console.log(user[key]);
    }


    // Tasks 

    // 1
    let _user = {};
    _user.name = "john";
    _user.surname = "Smith";
    _user.name = "Pete";
    delete _user.name;

 

    // 2
    function isEmpty(obj){
        for(let key in obj){
            return false;
        }
        return true;
    }
    let emptyObj = new Object();
    console.log(isEmpty(_user)); // false
    console.log(isEmpty(emptyObj)); // true



    // function isEmpty(key){
    //     return key in _user;
    // }
    // console.log(isEmpty("surname")); // true
    // console.log(isEmpty("name")); // false    (bcz name is deleted)

   
    // 3

    let salaries = {
        John: 100,
        Ann: 160,
        Pete: 130
      }
    let sum = 0;
      for(let salary in salaries){
          sum+=salaries[salary];
      }
      console.log("Total Salary-" , sum);


    //   4

    let menu = {
        width: 200,
        height: 300,
        title: "My menu"
      };
      console.log(menu);

      function multiplyNumeric(obj){
        for( let key in obj){
           (isNaN(obj[key])) ? obj[key] :obj[key]*=2;
        }
      }
      multiplyNumeric(menu);
      console.log(menu);



    //   Key Values Entries

    console.log("-----------Key Values Entries-----")

    let userNew = {
        name: "rahul",
        middleName: "singh",
        lastName : "Rajput"
    }

    console.log(Object.keys(userNew));
    console.log(Object.values(userNew));
    console.log(Object.entries(userNew))  // converts object to array 
    console.log(userNew)


  for(let x of Object.entries(userNew)){
    console.log("value", x);
  }
//   also works for keys and values

let prices = {
    banana: 1,
    orange: 2,
    meat: 4,
  };
  
  let doublePrices = Object.fromEntries(
    // convert prices to array, map each key/value pair into another pair
    // and then fromEntries gives back the object
    Object.entries(prices).map(entry => [entry[0], entry[1] * 2])
  );
  
  console.log(doublePrices.meat); // 
  console.log(prices);

// Tasks 

// 1 Sum the Properties;

let salariees  = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
  };
  
function sumSalaries(salaries){
    let sum = 0;
    for(let x of Object.values(salaries)){
        sum+=x;
    }
    return sum;
}
  console.log( sumSalaries(salariees) ); 

//   2 Count Propterties

let userObj = {
    name: 'John',
    age: 30
  };
  
   function count(user){
     return Object.keys(user).length;
   }

  console.log( count(userObj) ); // 2


    


