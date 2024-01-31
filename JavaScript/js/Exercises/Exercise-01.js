// Pattern-01

let size = +prompt("Enter size of Pattern");
// let size = 39;


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

// Pattern-3; (incomplete)

    for(let i = 0; i<size; i++){
        if(i<=size/2){
            for(let j = 0; j<=size/2; j++){
                (j == Math.floor(size/2)-i) ? document.write("*") : document.write(" _ ");
            }
        }else{
            for(let j = 0; j<=size/2; j++){
                (j == i-Math.floor(size/2)) ? document.write("*") : document.write(" _ ");
            }
        }   
        if(i<=size/2){
            for(let j = Math.floor(size/2)+1; j>=0; j--){
                (j == Math.floor(size/2)-i) ? document.write("*") : document.write(" _ ");
            }
        }else{
            for(let j = 1+Math.floor(size/2); j>=1; j--){
                (j == i-Math.floor(size/2)) ? document.write("*") : document.write(" _ ");
            }
        }   
        document.write("<br>");
    }
   
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

// Pattern- 05 (incomplete)

for(let i = 1; i<=size; i++){
    for(let j = i; j<=size; j++){
        document.write(j)  
    }
    document.write("<br>") 
}


