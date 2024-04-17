let path = require("path");



// console.log(path.dirname(__dirname));
// let a = path.parse(__dirname);

// console.log(__dirname,a.name);

let p1 = path.join(__dirname,"/rahul","singh","rajput");
console.log("p1",p1);

const absolutePath = path.resolve('folder', 'file.txt');
console.log("abosolutePath",absolutePath);


const dirname = path.dirname('/path/to/file.txt');
console.log("dirname",dirname);

const extension = path.extname('/path/to/file.txt');
console.log("extension",extension);

const isAbsolute = path.isAbsolute('./path');
console.log("isAbsolute",isAbsolute);

const basename = path.basename("/rahul/rahul.txt");
console.log("basename",basename);

const pathObj = path.format({
    root: '/rahulj',
    // dir: 'dir',
    // base: 'fileABC',
    name: "rahul",
    ext: '.js'

  });

  console.log(pathObj);