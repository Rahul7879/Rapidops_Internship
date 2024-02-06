// 11. Write​ ​ a ​ ​ JavaScript​ ​function​ ​ to​ ​ insert​ ​ a ​ ​ string​ ​ within​ ​ a ​ ​ string​ ​ at​ ​ a ​ ​ particular​ ​ position (default​ ​ is​ ​ 1).
let ori_string = "This is a sample string"
function insertStr(str,pos){
   return ori_string.substring(0,pos-1)+str+ori_string.substring(pos-1);
}
console.log(insertStr("insert me", 3));