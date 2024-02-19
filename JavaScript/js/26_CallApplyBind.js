
// In call and apply method we borrow a function and gives a reference of other Object 
// that we use in our borrowed function 

let obj = {
    name: "Rahul",
    surName: "Rajput",
    getName : function (){
    console.log(this.name," ",this.surName);
    }
}

let obj2 = {
    name: "Rohit",
    surName: "Chaturvedi"
}
obj.getName.call(obj2);

let getName = function (add,city){
    console.log(this.name," ",this.surName," from ",add,",",city);
    }
getName.call(obj,"Mp","Bhopal"); // first parameter takes refence of object
// and other used for arguments for function 


// in Call and apply there is only one difference that is in call method we pass arguments
// individually and in apply method we pass array of arguments in function

obj.getName.apply({name:"Deepak",surName : "Gupta"},[]);
getName.apply({name:"Deepak",surName : "Gupta"},["Jharkhand","dhanvad"]);


// Bind 

// call or apply direct call ho jate hein agar ham chahte he ki use future me call karein
//  to ham use bind ke store karke rakh sakte hein bus itna hi difference he 

let ForFuture = obj.getName.bind(obj2);
ForFuture();
ForFuture = getName.bind(obj,"MadhyaPradesh","Bhopal");
ForFuture();



