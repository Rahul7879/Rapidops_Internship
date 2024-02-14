
let size = "temp";
while(isNaN(size)){
    size = Math.floor(+prompt("Enter Number"));
}

for(let i = 0; i<size; i++){
        for(let j = 0; j<i; j++){
            document.write('&nbsp;&nbsp;');
        }
        for(let j = i+1; j<=size; j++){
            document.write(j + "&nbsp;&nbsp;");
        }
        document.write('<br>')
    }
    for(let i = size-2; i>=0; i--){
        for(let j = 0; j<i; j++){
            document.write('&nbsp;&nbsp;');
        }
        for(let j = i+1; j<=size; j++){
            document.write(j + "&nbsp;&nbsp;");
        }
        document.write('<br>')
    }
    