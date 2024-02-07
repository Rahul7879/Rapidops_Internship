// 3. Write​ ​ a ​​ JavaScript​ ​ function​ ​ to​ ​ remove​ ​ HTML/XML​ ​ tags​ ​ from​ ​ string.

let str = prompt("Enter String")
let ans = "";
let i = 0;
while(str[i] != '<'){
    ans+=str[i];
    i++;
}
for(i; i<str.length; i++){
    if(str[i] == '>'){
        i++;
        while(str.length > i && str[i] != '<'){
            ans+=str[i];
            i++;
        }
    }
}
alert(ans);