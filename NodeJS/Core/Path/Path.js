let path = require("path");

console.log(path.dirname(__dirname));
let a = path.parse(__dirname);

console.log(a.name);
