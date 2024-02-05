// 14. Write​ ​ a ​ ​ JavaScript​ ​ function​ ​ to​ ​ print​​ array​ ​ of​ ​ object​ ​ in​ ​ ascending​ ​ order​ ​ of​ ​ age, & descending​ ​ order​ ​ of​ ​ name.​ ​ Make​ ​ array​ ​ of​ ​ object​ ​ with​ ​ three​ ​ fields​ ​which are​​:

// 1.​ ​ Id,​ ​
// 2.​ ​ Name,​ ​
// 3.  Age

// NOTE:​ ​ Array​ ​ have​ ​ minimum​ ​ 10​ ​ objects.

let arr = [
    {Id:1,Name:"Rahul",Age:22},
    {Id:3,Name:"Deepak",Age:20},
    {Id:2,Name:"Yash",Age:2}
]
function Arrange(key){
    if(key == 'Age'){
        arr.sort((a,b)=>a[key]-b[key]);
    }else{
        arr.sort((a,b)=>a[key].localeCompare(b[key]));
    }
}
function Ascendig(key){
    
}
Arrange("Name");
console.log(arr);
Arrange("Age");
console.log(arr);
