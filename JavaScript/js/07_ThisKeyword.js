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
  
    read : ()=> {
      // this.a,
      // this.b
      console.log(this);
    }
  };
  
  calculator.read();
  // console.log( calculator.sum(3,5) );
  // console.log( calculator.mul(2,2) );



 console.log("RoadSide Coder Youtube");



 this.a = 10;
 let b = 20;
 console.log(this.a);
 console.log(this);


 function func(){
  // this.b = 30;
  console.log(this);
  console.log(this.b);

 }
 func();

//  Question 

let calc = {
 total: 0,
  add : function(num){
     this.total+=num;
     return this
  },
  mul : function(num){
    this.total*=num;
    return this;
  },
  sub : function(num){
    this.total-=num;
    return this;
  }
}

console.log(calc.add(10).mul(5).sub(20).add(10));
console.log(calc.total)


