let size = "temp";
while(isNaN(size)){
    size = Math.floor(+prompt("Enter size"));
}

let half = Math.floor(size/2);

for (let i = 0; i < size; i++) {
    for(let j = 0; j<size; j++){
                if(i === j+half || i+half === j || i+half === size-j-1 || i === size-j-1+half) {
                    document.write("*")
                }else{
                    document.write("&nbsp;&nbsp")
            }
        }
        document.write("<br>");
}