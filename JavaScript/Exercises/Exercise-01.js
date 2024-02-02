// Pattern-01

let size = +prompt("Enter size of Pattern");

for(let i = 0; i<size; i++){
    for(let j = 0; j<size; j++){
        (i == j || j == size-i-1) ? document.write("O") : document.write("&nbsp&nbsp");
    }
    document.write("<br>")
}

// Pattern-02

for(let i = 0; i<size; i++){
    for(let j = 0; j<size; j++){
      (i == 0 || i == size-1 || j == 0 || j == size-1) ? document.write("*") : document.write("_");
    }
    document.write("<br>") 
}

// Pattern-3; 

let len = size-2;  //bcz we are printing one-one star on top and bottom manually 
    for(let i = 0; i<len; i++){
        (i == Math.ceil(len/2)) ? document.write(" * ") : document.write(" _ ");
    }
    document.write("<br>");
    for(let i = 0; i<len; i++){
        if(i<=Math.floor(len/2)){
            for(let j = 0; j<=Math.floor(len/2); j++){
                (j == Math.floor(len/2)-i) ? document.write(" * ") : document.write(" _ ");
            }
        }else{
            for(let j = 0; j<=Math.floor(len/2); j++){
                (j == i-Math.floor(len/2)) ? document.write(" * ") : document.write(" _ ");
            }
        }   
        if(i<=Math.floor(len/2)){
            for(let j = Math.floor(len/2)+1; j>=0; j--){
                (j == Math.floor(len/2)-i) ? document.write(" * ") : document.write(" _ ");
            }
        }else{
            for(let j = 1+Math.floor(len/2); j>=1; j--){
                (j == i-Math.floor(len/2)) ? document.write(" * ") : document.write(" _ ");
            }
        }   
        document.write("<br>");
    }
    for(let i = 0; i<len; i++){
        (i == Math.ceil(len/2)) ? document.write(" * ") : document.write(" _ ");
    }
    document.write("<br>");

// Pattern-04

for(let i = 0; i<size; i++){
   if(i<=size/2){
    for(let j = 0; j<=i; j++){
        document.write(" * ");
      }
   }else{
    for(let j = 0; j<size-i; j++){
        document.write(" * ");
      }
   }
   document.write("<br>")   
}

// Pattern- 05

for(let i = 0; i<size; i++){
    for(let j = 0; j<i; j++){
        document.write('_');
    }
    for(let j = i+1; j<=size; j++){
        document.write(`${j}_`);
    }
    document.write('<br>')
}
for(let i = size-2; i>=0; i--){
    for(let j = 0; j<i; j++){
        document.write('_');
    }
    for(let j = i+1; j<=size; j++){
        document.write(`${j}_`);
    }
    document.write('<br>')
}


