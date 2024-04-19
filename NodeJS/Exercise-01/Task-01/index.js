let fs = require("fs");
let path = require('path')


fs.mkdir("Output", { recursive: true }, (err) => {
    if (err) {
        console.error("Error while creating Output directory", err);
        return;
    }
    fs.readFile("input.txt", "utf-8", (err, data) => {
        if (err) {
            console.error("Error while reading input.txt ", err);
            return;
        }
        const map = new Map();
        
        for (const char of data) {
            const count = map.get(char) || 0;
            map.set(char, count + 1);
        }
        
        let arr = {}; 
        for (const [char, count] of map) {
            let n = "./Output/" + count+"/";
            let newone = path.join(__dirname,n+char+".txt");
            if (!arr[count]) {
                arr[count] = {};
                arr[count][char+".txt"] = path.relative(__dirname, path.join(__dirname,n,`${char}.txt`));
                fs.mkdirSync(path.join(__dirname,n),{recursive:true});
            } else {
                arr[count][char+".txt"] = path.relative(__dirname, path.join(__dirname,n,`${char}.txt`));
            }
            fs.writeFileSync(newone,path.relative(__dirname, path.join(__dirname,n,`${char}.txt`)));
        }
        console.log(JSON.stringify(arr));
        let jsonData = {Output : arr}
        fs.writeFileSync(__dirname+"/Output.json",JSON.stringify(jsonData));
    })
})


// Brute Force

// fs.mkdir("Output", (err, data) => {
//     fs.readFile("input.txt", "utf-8", (err, data) => {
//         const map = new Map()
//         for (const char of data) {
//             const count = map.get(char) || 0;
//             map.set(char, count + 1);
//         }
//         let arr = [];
//         for (const [char, count] of map) {
//             arr.push(count);
//         }
//         let st = new Set(arr);
//         console.log(st);
//         for (const name of st) {
//             let n = "Output/" + name+"/";
//             console.log(n)
//             fs.mkdirSync(path.join(n),{recursive:true});
//             for (const [char, count] of map) {
//                 if(name === count){
//                     for(let i = 0; i<count; i++){
//                         let newone = path.join(__dirname,n+char+".txt");
//                         fs.writeFileSync(newone,n+char+".txt");
//                     }
//                 }
//             }
//         }
//     })
// })


