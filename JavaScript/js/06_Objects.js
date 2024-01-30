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






    


