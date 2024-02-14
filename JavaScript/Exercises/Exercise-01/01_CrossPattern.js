let size = "temp";
while(isNaN(size)){
    size = Math.floor(+prompt("Enter size"));
}

for(let i = 0; i<size; i++){
    for(let j = 0; j<size; j++){
        (i === j || j === size-i-1) ? document.write("*") : document.write("&nbsp");
    }
    document.write("<br>")
}