// Need to know 

// A common pitfall for novice developers is to put a comma between class methods,
//  which would result in a syntax error.
// The notation here is not to be confused with object literals. Within the class, no commas are required.
// type of class is function 
// classes also can we written as variable

class myClass {
    constructor(name){
        this.name = name;
    }
    sayHi(){
        console.log(this.name);
    }
}
let user = new myClass("John");
let user2 = new myClass("Rahul");
user.sayHi();
user2.sayHi();
console.log(typeof myClass); // function
console.log(myClass === myClass.prototype.constructor);

myClass.prototype.rahul = function(){
    console.log("Hello I am Rahul Singh Rajput");
}
let a = new myClass("Rahul");
a.rahul();


let varExpr = class {
    sayHi() {
      console.log("Hello");
    }
  };
let b = new varExpr();
  b.sayHi();
  new varExpr().sayHi();


//   Getters And Setters 

class User2 {

    constructor(name) {
      this.name = name;
    }
  
    get name() {
      return this._name;
    }
  
    set name(value) {
      if (value.length < 4) {
        console.log("Name is too short.");
        return;
      }
      this._name = value;
    }
  
  }
  
  let user4 = new User2("John");
  console.log(user4.name); // John
  
  let user5 = new User2(""); // Name is too short.

  