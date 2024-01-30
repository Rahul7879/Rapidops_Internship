let user = new Object();

user.name = "Rahul Singh Rajput",
user.age = 22;

user.sayHii = function (){
    console.log("Hello");
}

console.log(user.sayHii());


// tasks

let calculator = {
    a:6,
    b:4,
    sum(a,b) {
      return this.a + this.b;
    },
  
    mul(a,b) {
      return this.a * this.b;
    },
  
    read() {
      this.a,
      this.b
    }
  };
  
  calculator.read();
  console.log( calculator.sum(3,5) );
  console.log( calculator.mul(2,2) );