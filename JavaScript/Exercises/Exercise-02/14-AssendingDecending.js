// 14. Write​ ​ a ​ ​ JavaScript​ ​ function​ ​ to​ ​ print​​ array​ ​ of​ ​ object​ ​ in​ ​ ascending​ ​ order​ ​ of​ ​ age, & descending​ ​ order​ ​ of​ ​ name.​ ​ Make​ ​ array​ ​ of​ ​ object​ ​ with​ ​ three​ ​ fields​ ​which are​​:

// 1.​ ​ Id,​ ​
// 2.​ ​ Name,​ ​
// 3.  Age

// NOTE:​ ​ Array​ ​ have​ ​ minimum​ ​ 10​ ​ objects.

let arr = [
    {Id:1,Name:"Rahul",Age:22},
    {Id:3,Name:"Deepak",Age:20},
    {Id:2,Name:"Yash",Age:2},
    {Id:4,Name:"Kartik",Age:22},
    {Id:5,Name:"Rohit",Age:21},
    {Id:6,Name:"Sonu",Age:2},
    {Id:7,Name:"Dhey",Age:24},
    {Id:8,Name:"Mayank",Age:18},
    {Id:9,Name:"Tony Stark",Age:70},
    {Id:10,Name:"John",Age:100}
]
function Arrange(key){
    if(key == 'Age'){
        arr.sort((a,b)=>a[key]-b[key]);
    }else{
        arr.sort((a,b)=>a[key].localeCompare(b[key]));
    }
}

Arrange("Name");
console.log(arr);
Arrange("Age");
console.log(arr);
