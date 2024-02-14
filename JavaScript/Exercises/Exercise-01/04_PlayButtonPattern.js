let size = "temp";
while(isNaN(size) || size%2 === 0){
    size = Math.floor(+prompt("Enter Odd Number"));
}

for(let i = 0; i<size; i++){
   if(i<=size/2){
    for(let j = 0; j<=i; j++){
        document.write("*");
      }
   }else{
    for(let j = 0; j<size-i; j++){
        document.write("*");
      }
   }
   document.write("<br>")   
}