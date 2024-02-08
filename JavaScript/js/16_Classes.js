// Need to know 

// A common pitfall for novice developers is to put a comma between class methods,
//  which would result in a syntax error.
// The notation here is not to be confused with object literals. Within the class, no commas are required.
// type of class is function 
// classes also can we written as variable

// class myClass {
//     constructor(name){
//         this.name = name;
//     }
//     sayHi(){
//         console.log(this.name);
//     }
// }
// let user = new myClass("John");
// let user2 = new myClass("Rahul");
// user.sayHi();
// user2.sayHi();
// console.log(typeof myClass); // function
// console.log(myClass === myClass.prototype.constructor);

// myClass.prototype.rahul = function(){
//     console.log("Hello I am Rahul Singh Rajput");
// }
// let a = new myClass("Rahul");
// a.rahul();


// let varExpr = class {
//     sayHi() {
//       console.log("Hello");
//     }
//   };
// let b = new varExpr();
//   b.sayHi();
//   new varExpr().sayHi();


// //   Getters And Setters 

// class User2 {

//     constructor(name) {
//       this.name = name;
//     }
  
//     get name() {
//       return this._name;
//     }
  
//     set name(value) {
//       if (value.length < 4) {
//         console.log("Name is too short.");
//         return;
//       }
//       this._name = value;
//     }
  
//   }
  
//   let user4 = new User2("John");
//   console.log(user4.name); // John
  
//   let user5 = new User2(""); // Name is too short.

  

//   class UserNew {
//      name = prompt("Name, please?", "John");
//      namenew = "Rahul"
//   }
  
//   let usernew = new UserNew();
//   // console.log( usernew.name); // John
//   console.log(usernew); // John



  // Practice Task Ecommerce 

  class User {
    products = [];
    addProduct(item,price){
      let temp = {
        price: this.price;

      };


      this.products.push(temp);
      // console.log(this.products);
    }
    removeProduct(item){
      if(!this.product.includes(item)){
        console.log("Product is Not present in List")
        return;
      }
      this.product = this.product.filter((p)=>{
          return  p !== item;
      })
      console.log(this.product)
    }
  }

  let user1 = new User();
  user1.addProduct("apple",100);
  user1.addProduct("mango",200);
  // user1.removeProduct("mango")

  console.log(user1)
