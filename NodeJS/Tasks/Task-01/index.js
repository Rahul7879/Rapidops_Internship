let fs = require('fs').promises;
let path = require('path')


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


async function processFileAndCreateDirectories() {
    try {
        await fs.mkdir("Output", { recursive: true });
        console.log("hello")
        const data = await fs.readFile("input.txt", "utf-8");
        
        const charCountMap = new Map();
        for (const char of data) {
            charCountMap.set(char, (charCountMap.get(char) || 0) + 1);
        }

        const countToChars = new Map();

        for (const [char, count] of charCountMap) {
            if (!countToChars.has(count)) {
                countToChars.set(count, []);
            }
            countToChars.get(count).push(char);
        }

        for (const [count, chars] of countToChars) {
            const dirPath = path.join(__dirname, "Output", String(count));
            await fs.mkdir(dirPath, { recursive: true });

            for (const char of chars) {
                const filePath = path.join(dirPath, `${char}.txt`);
                await fs.writeFile(filePath, dirPath+`/${char}.txt`);
            }
        }

        console.log("Directories and files created based on character counts.");
    } catch (err) {
        console.error('Error:', err.message);
    }
}

processFileAndCreateDirectories();