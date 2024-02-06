// 6. Write​ ​ a ​ ​ JavaScript​ ​ function​ ​ to​ ​ fill​ ​ an​ ​ array​ ​with​ ​ values​ ​ (either numeric or​ string​ ​ with​ ​ one character)​ ​ on​ ​ supplied​ ​ bounds.

let static_array = [ "a" , "b" , "c" , "d" , "e" , "f" , "g" , "h" , "i" , "j" , "k" , "l" , "m" , "n" , "o" , "p" , "q" , "r" , "s" , "t" , "u" , "v" , "w" , "x" , "y" , "z" ]

function FillAnArr(a,b,len){
    let first = static_array.indexOf(a);
    let second = static_array.indexOf(b);

    for(let i = first; i<=second; i+=len){
        console.log(static_array[i]);
    }
}

FillAnArr('a','z',12);
