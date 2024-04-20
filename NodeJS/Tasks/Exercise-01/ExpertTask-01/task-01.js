const fs = require("fs");
const { join } = require("path");
// let fs = require("fs").promises;

const readFileName = "text.txt";
const writeFileName = "oneword.txt";

let chunkCount = 0;

const readableStream = fs.createReadStream(join(__dirname, readFileName), {
    highWaterMark: 1024*2,
});
const writableStream = fs.createWriteStream(join(__dirname, writeFileName));

let incompleteLine = "";

readableStream.on("data", (chunk) => {

    console.log(chunkCount++,"***********************chunk received**********************");

    const currentData = incompleteLine + chunk.toString();
    const lines = currentData.split(".");
    incompleteLine = lines.pop();
    console.log(incompleteLine);
    for (let line of lines) {
        line = line.replace(/[,.]/g, '')
        writableStream.write(`${line.split(' ').join('\n')}`);
    }
});


readableStream.on("end", (chunk) => {
    const lines = incompleteLine;
    for (let line of lines) {
        line = line.replace(/[,.]/g, '')
        writableStream.write(`${line.split(' ').join('\n')}`);
    }
});
