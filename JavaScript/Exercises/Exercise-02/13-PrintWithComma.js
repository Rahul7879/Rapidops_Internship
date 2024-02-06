// 13. Write​ ​ a ​ ​ JavaScript​ ​ function​ ​ to​ ​ print​​ an​ ​ integer​ ​ with​ ​ commas​ ​ as​ ​ thousands​ ​ separators.

function Print(num){
    let str = "";
    let start = num.length%3;
    str+=(start != 0) ? num.substring(0,start)+',' : str;
    
    for(let i = start; i<num.length; i+=3){
        str+=(i<num.length-3) ? num.substring(i,i+3)+',': num.substring(i,i+3);
    }
    console.log(str);
}

// Print("233988932453");

// other methods


let number = 923429835
let str = number.toLocaleString("en-US");
console.log(str);