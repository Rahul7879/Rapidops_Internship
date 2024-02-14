let size = "temp";
while(isNaN(size)){
    size = Math.floor(+prompt("Enter size"));
}

for(let i = 0; i<size; i++){
    for(let j = 0; j<size; j++){
      (i === 0 || i === size-1 || j === 0 || j === size-1) ? document.write("*") : document.write("&nbsp;&nbsp");
    }
    document.write("<br>") 
}