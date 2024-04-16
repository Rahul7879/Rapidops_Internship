let fs = require("fs");
let path = require("path");
console.time();

// read text file
let text = fs.readFileSync("./files/file1.txt", "utf-8");
console.log(text);

let newText = "currently"
newText = text + newText;
console.log(newText);

// read video file
let vidcontent = fs.readFileSync("./files/video.mp4");
console.log(vidcontent);
// write text to a file
let filepath = path.join(__dirname, "files/writtefile.txt");
fs.writeFileSync(filepath, newText);

// write video to a file
let videofilepath = path.join(__dirname, "files/writtedvide.mp4");
fs.writeFileSync(videofilepath, vidcontent);

fs.appendFileSync(filepath,"appended")
// fs.appendFileSync(videofilepath,vidcontent);

console.log("End");
console.timeEnd();



