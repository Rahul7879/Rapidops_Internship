// 1.
// console.log(0.1 + 0.2 === 0.3);

// 2.
// const a = {
//     val: 1,
//     toString: function() {
//       return this.val++;
//     }
    //    same for valueof   
     
//   };
  
//   if (a == 1 && a == 2 && a == 3) {
//     console.log('This works!');
//   }

// 3.
// var a = 1;
// function b() {
//     a = 10;
//     return;
//     function a() {};
//     // var a = 20;
// }
// b();
// console.log(a);

// 4.
// console.log(typeof typeof 4); 

// 5.
//    console.log([4]+[5]);
//    console.log([4,2]+[5,5]);
//    console.log([4,3]-[5]);

// 6.

function Animal(name) {
    this.name = name;
  }
  
  Animal.prototype.speak = function () {
    console.log(this.name + ' makes a noise.');
  }
  
  class Dog extends Animal {
    speak() {
      super.speak();
      console.log(this.name + ' barks.');
    }
  }
  
  let dog = new Dog('Rex');
  dog.speak();





