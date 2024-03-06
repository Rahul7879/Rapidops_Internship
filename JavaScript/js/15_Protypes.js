let myHeros = ["thor", "spiderMan", "Hulk","CaptainAmerica"];

let heroPower = {
    thor: "Hammer",
    spiderMan: "Sling",
    captainAmerica: "Shield",
    getThorPower: function(){
        console.log(`Thor's Power is ${this.thor}`)
    },
    getCapPower: function(){
        console.log(`Captain's Power is ${this.captainAmerica}`)
    }
}
heroPower.getThorPower();
heroPower.getCapPower();

Object.prototype.rahul = function(){
    console.log("Hey I am Rahul");
} //now this power is accessible in every where in program (function string ,array every thing);
myHeros.rahul();
heroPower.getCapPower.rahul();


// now if want to create method for individual 

Array.prototype.hey = function(){
    console.log("hello");
}
myHeros.hey();

let dcHeros = ["superMan","batMan", "WonderWomen","flash"];

let dcHerosPowers = {
    superMan: "fly",
    flash: "speed",
    __proto__ : heroPower
}

console.log(dcHerosPowers)


// New Keyword

function createUser(username,age){
  this.username = username;
  this.age = age;
}
createUser.prototype.increment = function(){
    this.age++;
    console.log(this.age);
}

let user1 = new createUser("rahul",22);
let user2 = new createUser("rohit",2);

user1.increment();
user2.increment();

