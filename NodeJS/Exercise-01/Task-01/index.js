const fs = require("fs").promises;
const path = require("path");

async function countAndOrganizeCharacter() {
    const baseDir = path.join(__dirname, "Output");
    try {
        await fs.mkdir(baseDir, { recursive: true });
        const inputFilePath = path.join(__dirname, "input.txt");
        const inputFileContent = await fs.readFile(inputFilePath, "utf-8");

        const charCount = countCharacters(inputFileContent);
        const jsonData = await writeCharacterFiles(charCount, baseDir);

        await fs.writeFile(path.join(__dirname, "Output.json"), JSON.stringify({Output:jsonData}));
    } catch (err) {
        console.error("Failed to process text file:", err);
    }
}

function countCharacters(text) {
    const map = new Map();
    for (const char of text) {
        map.set(char, (map.get(char) || 0) + 1);
    }
    return map;
}

async function writeCharacterFiles(charCountMap, baseDir) {
    const jsonData = {};
    for (const [char, count] of charCountMap) {
        const subFolder = path.join(baseDir, `${count}`);
        const fileName = path.join(subFolder, `${char}.txt`);

        if (!jsonData[count]) {
            jsonData[count] = {};
            await fs.mkdir(subFolder, { recursive: true });
        }
        
        jsonData[count][`${char}.txt`] = path.relative(__dirname, fileName);
        await fs.writeFile(fileName, path.relative(__dirname, fileName));
    }
    return jsonData;
}

countAndOrganizeCharacter();





// let fs = require("fs");
// let path = require('path')


// fs.mkdir("Output", { recursive: true }, (err) => {
//     if (err) {
//         console.error("Error while creating Output directory", err);
//         return;
//     }
//     fs.readFile("input.txt", "utf-8", (err, data) => {
//         if (err) {
//             console.error("Error while reading input.txt ", err);
//             return;
//         }
//         const map = new Map();

//         for (const char of data) {
//             const count = map.get(char) || 0;
//             map.set(char, count + 1);
//         }

//         let arr = {};
//         for (const [char, count] of map) {
//             let n = "./Output/" + count + "/";
//             let newone = path.join(__dirname, n + char + ".txt");

//             if (!arr[count]) {
//                 arr[count] = {};
//                 arr[count][char + ".txt"] = path.relative(__dirname, path.join(__dirname, n, `${char}.txt`));
//                 fs.mkdirSync(path.join(__dirname, n), { recursive: true });
//             } else {
//                 arr[count][char + ".txt"] = path.relative(__dirname, path.join(__dirname, n, `${char}.txt`));
//             }
//             fs.writeFileSync(newone, path.relative(__dirname, path.join(__dirname, n, `${char}.txt`)));
//         }
//         console.log(JSON.stringify(arr));
//         let jsonData = { Output: arr }
//         fs.writeFileSync(__dirname + "/Output.json", JSON.stringify(jsonData));
//     })
// })


