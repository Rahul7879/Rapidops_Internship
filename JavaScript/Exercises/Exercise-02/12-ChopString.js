// 12. Write​ a ​ ​ JavaScript​ ​ function​ ​ to​ ​ chop​ ​ a ​ ​ string​ ​into​ ​ chunks​ ​ of​ ​ a ​ ​ given​ ​ length.

let str = "HElloRahull"
function ChopStr(len){
    let ChopedString = [];
    let prev = 0;
   for(let i = len; i<str.length+len; i+=len){
      ChopedString.push(str.substring(prev,i));
      prev = i;
   }
   return ChopedString;
}
console.log(ChopStr(3));