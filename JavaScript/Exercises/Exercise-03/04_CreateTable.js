// 4. Write​ ​ a ​ ​ JavaScript​ ​ function​ ​ that​ ​ creates​ ​ a ​ ​ table,​ ​ by accepting​ ​ row and ​ column​ ​ numbers​ ​ from​ ​ the user,​
//  ​ and​ ​display​s ​ row-column​ ​ number​ ​ as​ ​ content​ ​ (e.g.​ ​ Row-0​ ​ Column-0)​ ​ of​ ​ a ​ ​ cell.


// let row = +prompt("Enter row Count");
// let col = +prompt("Enter row Count");
row = 5;
col = 5;


// for(let i = 0; i<row; i++){
//     for(let j = 0; j<col; j++){
//         document.write(`<strong>  Row-${i} Column-${j}  </strong>`)
//     }
//     document.write("<br>")
//     document.write("<br>")
// }

let arr = [];

for(let i = 0; i<row; i++){
    let temp = [];
    for(let j = 0; j<col; j++){
        temp.push(`Row-${i} Column-${j}`)
    }
    arr.push(temp);
}
console.table(arr);