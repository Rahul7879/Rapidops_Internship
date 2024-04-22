const http = require('http');
const routes = require('./src/routes/index.js');
const fs = require("fs");

const port = process.env.port || 8000;
const hostname = 127;

let data = (JSON.parse(fs.readFileSync("./src/db/input.json", "utf-8"))).input
console.log(data);

const server = http.createServer((req, res) => {

  console.log(req.url,req.params);
  if (req.url === "/data/all") {

    let random1000 = [];
    for (let i = 0; i < 1000; i++) {
      let randomKey = Math.floor(Math.random() * 1999);
      console.log(data[randomKey])
      random1000.push(data[randomKey]);
    }
    fs.writeFileSync("./random1000.json", JSON.stringify(random1000));
    res.end(JSON.stringify(random1000));

  }else if (req.url === "/data/_id"){

  }

  // const handler = routes[req.url];
  // if (handler) {
  //   // handler(req, res);
  // } else {
  //   res.statusCode = 404;
  //   res.setHeader('Content-Type', 'text/plain');
  //   res.end('404 Not Foun');
  // }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://:${port}/`);
});





// let data = [];
// let uniqueID = new Set(); // Using a Set to store unique IDs

// // Keep generating and adding unique IDs until we have 2000
// while (uniqueID.size < 2000) {
//     let randomID = Math.floor(Math.random() * 2000); // Increase range to 2000 to ensure enough unique values

//     // Check if the ID is already used
//     if (!uniqueID.has(randomID)) {
//         uniqueID.add(randomID);
//         let obj = {
//             _id: randomID,
//             name: `User ${uniqueID.size}` // Name corresponding to the number of the user
//         };
//         data.push(obj);
//     }
// }
// // console.log(data)

// fs.writeFileSync("./src/db/input.json",JSON.stringify(data));