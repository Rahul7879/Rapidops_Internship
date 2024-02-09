let str = "AbBcdD";
let ans = "";

for(let i = 0; i<str.length-1; i++){
    if(str[i] !== str[i+1] && str[i] == str[i+1].toLowerCase()){
        ans+=str[i]+"-"
    }else{
        ans+=str[i];
    }
}
ans+=str[str.length-1]
console.log(ans);