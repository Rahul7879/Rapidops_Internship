// let fs = require('fs').promises;
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
                arr[count][char+".txt"] = path.relative(__filename, path.join(__dirname,n,`${char}.txt`));
                fs.mkdirSync(path.join(__dirname,n),{recursive:true});
            } else {
                arr[count][char+".txt"] = path.relative(__filename, path.join(__dirname,n,`${char}.txt`));
            }
            fs.writeFileSync(newone,path.relative(__filename, path.join(__dirname,n,`${char}.txt`)));
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
//             let n = "./Output/" + name+"/";
//             console.log(n)
//             fs.mkdirSync(path.join(__dirname,n));
//             for (const [char, count] of map) {
//                 if(name === count){
//                     for(let i = 0; i<count; i++){
//                         let newone = path.join(__dirname,n+char+".txt");
//                         fs.writeFileSync(newone,newone);
//                     }
//                 }
//             }
//         }
//     })
// })


// async function processFileAndCreateDirectories() {
//     try {
//         await fs.mkdir("Output", { recursive: true });
//         console.log("hello")
//         const data = await fs.readFile("input.txt", "utf-8");
        
//         const charCountMap = new Map();
//         for (const char of data) {
//             charCountMap.set(char, (charCountMap.get(char) || 0) + 1);
//         }

//         const countToChars = new Map();

//         for (const [char, count] of charCountMap) {
//             if (!countToChars.has(count)) {
//                 countToChars.set(count, []);
//             }
//             countToChars.get(count).push(char);
//         }

//         for (const [count, chars] of countToChars) {
//             const dirPath = path.join(__dirname, "Output", String(count));
//             await fs.mkdir(dirPath, { recursive: true });

//             for (const char of chars) {
//                 const filePath = path.join(dirPath, `${char}.txt`);
//                 await fs.writeFile(filePath, dirPath+`/${char}.txt`);
//             }
//         }

//         console.log("Directories and files created based on character counts.");
//     } catch (err) {
//         console.error('Error:', err.message);
//     }
// }

// processFileAndCreateDirectories();