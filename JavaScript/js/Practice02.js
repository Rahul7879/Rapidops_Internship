
class A{
    static sayHi(){
        console.log("hello from A");
    }
}
class B{
    static sayHi(){
        console.log("hello from B");
    }
}

let obj = {
    a : 'A',
    b: 'B',
    c : {
       name: "rahul",
       age:10,
    }
}
let a = "c";

// console.log(obj[a]);
// console.
// let obj2 = {...obj};

// obj2.a = "Ab";

console.log(obj[a])
// console.log(obj['a'].sayHi())

// obj['a'].sayHi();
// obj['a'].sayHi();


let str = "rahulsinghrajput";

// console.log(str.split(""));

let aa = 5;
let x = ++aa + aa++ + aa++ + aa;
console.log(x);



let obj1 = {
    name: "Rahul",
    age:22
}

let obj2 = new Object();
obj2.name = "neha";
obj2.__proto__ = obj1;
obj2.__proto__.name = "hello";
console.log(obj2.__proto__.name);
console.log(obj1);



// let ob1 = {age:22};
// let ob2 = ob1;
// ob2.age = ob1.age+=1;
// // ob1.age++;
// console.log(ob1,ob2);


let ob1 = {name: "Rahul"};
let ob2 = {};
ob2.__proto__ = ob1;
console.log(ob2);

// ob2.__proto__.name = "Dhyey";
console.log(ob1);



function createUser(name,age){
    this.name = name,
    this.age = 20
}

createUser.prototype.about = function(){
    console.log(this.name,this.age);
    return "done";
}
let user1 = new createUser("Rahul",22);

console.log(user1.about());

let arr1 = new Array(1,2,3,4,5);
console.log(Array.prototype);