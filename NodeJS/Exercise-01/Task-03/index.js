const fs = require("fs").promises;
const path = require('path');
const zlib = require('zlib');
const { createReadStream, createWriteStream } = require('fs');

const writeCsvHeader = async () => {
    try {
        await fs.writeFile('./folderSize.csv', 'Directory,Size \n');
    } catch (error) {
        console.error("Failed to create file:", error);
    }
};

const calculateDirectorySize = async (directoryPath) => {
    const fileList = await fs.readdir(directoryPath);
    const sizeTasks = fileList.map(async (file) => {
        const filePath = path.join(directoryPath, file);
        const fileStats = await fs.stat(filePath);
        
        if (fileStats.isDirectory()) {
            const directorySize = await calculateDirectorySize(filePath);
            await fs.appendFile('./folderSize.csv', `${file},${directorySize}\n`);
            return directorySize;
        } else {
            return fileStats.size;
        }
    });

    const fileSizes = await Promise.all(sizeTasks);
    return fileSizes.reduce((totalSize, fileSize) => totalSize + fileSize, 0);
};

const compressCsvFile = async () => {
    const csvFilePath = 'folderSize.csv';
    const compressedFilePath = 'compFolderSize.gzip';
    const readStream = createReadStream(csvFilePath);
    const writeStream = createWriteStream(compressedFilePath);
    const gzip = zlib.createGzip();

    return new Promise((resolve, reject) => {
        readStream.pipe(gzip).pipe(writeStream).on('finish', () => {
            console.log('CSV file successfully compressed');
            resolve();
        }).on('error', reject);
    });
};

const analyzeDirectorySize = async (directoryName) => {
    try {
        await writeCsvHeader();
        const totalSize = await calculateDirectorySize(path.join(__dirname, directoryName));
        console.log("Total size of directory", directoryName, "is", totalSize);
        await compressCsvFile();
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log("folder does not exist!");
        } else {
            console.error("Error processing directory:", error);
        }
    }
};

analyzeDirectorySize("node_modules");
