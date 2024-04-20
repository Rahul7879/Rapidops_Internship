const fs = require("fs");
const pfs = require("fs").promises;
const path = require('path');

async function writeHeader() {
        fs.writeFile('./folderSize.csv', 'Directory,Size \n',(err)=>{
            if(err){
                console.log("file not created")
            }
        });
}

async function calculateFolderSize1(dirName) {
    let files = await pfs.readdir(dirName);
    let totalSize = 0;

    for (let file of files) {
        let filePath = path.join(dirName, file);
        let stats = await pfs.stat(filePath);

        if (stats.isDirectory()) {
            let dirSize = await calculateFolderSize1(filePath);
            await pfs.appendFile('./folderSize.csv', `${file},${dirSize}\n`);
            totalSize += dirSize;
        } else {
            totalSize += stats.size;
        }
    }
    return totalSize;
}

function calculateFolderSize2(dirName) {
    let allDirectory = fs.readdirSync(dirName);
    let folderSize = 0;
    for (let i of allDirectory) {
        let a = fs.statSync(path.join(dirName, i));
        let flag = !path.extname(i);
        let untrackedFiles = ["license",".npmignore","makefile",".eslintrc","mime"]
        if (untrackedFiles.includes(i.toLowerCase())) {
            folderSize += a.size;
        }
        else if (flag) {
            let size = calculateFolderSize2(path.join(dirName, i));
            console.log("file", i, "size", size);
            fs.appendFileSync("./folderSize.csv", i + "," + size + "\n");
            folderSize += (size);
        } else {
            folderSize += a.size;
        }

    }
    return folderSize;
}

function compressCSV(){
    const zlib = require('zlib');
    const readStream = fs.createReadStream('folderSize.csv');
    const writeStream = fs.createWriteStream('compFolderSize.gzip');
    const gzip = zlib.createGzip();
    readStream.pipe(gzip).pipe(writeStream).on('finish', () => {
        console.log('File successfully compressed');
    });
}

async function readFolder(dirName) {
    await writeHeader();
    let size = await calculateFolderSize1(path.join(__dirname,dirName));
    // let size =  calculateFolderSize2(path.join(__dirname,dirName));
    console.log("Total size of directory", dirName, "is", size);
    compressCSV()

}

readFolder("node_modules");
