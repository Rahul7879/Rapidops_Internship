let fs = require("fs").promises;

async function readFile(filePath) {
    try {
      const data = await fs.readFile(filePath, 'utf8');
      fs.writeFile('file')
      console.log("Promise read",data);
    } catch (err) {
      console.error(err);
    }
  }
  
  readFile('file1.txt');