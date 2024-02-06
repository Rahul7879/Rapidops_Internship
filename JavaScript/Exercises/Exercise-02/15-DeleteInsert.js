// 15. Write​ ​ a ​ ​ JavaScript​ ​ function​ ​ to​ ​ delete​ ​ particular​ ​object​ ​ from​ ​ array​ ​ and​ ​ add​ 
// ​ new​ ​ object​ ​ at particular​ ​ position. Also if the position does not exist then error message should be shown to the user.

let static_array = [  {name:  "Jack" , age : 23}, {name:  "Sam" , age : 12},  {name:  "Max" , age : 20} ]

function DeleteEle(pos){
     static_array.splice(pos,1);
}
function InsertEle(pos,name,age){
    // let newObj =  {name:  name , age : age}
    let newObj =  {name,age}
      static_array.splice(pos,0,newObj);
 }

DeleteEle(1);
InsertEle(1,"Rahul",32);
console.log(static_array);