// 4. additional question
const fs = require("fs").promises;
const { join } = require("path");
const fileName = "json.json"
const names = [
  "abc",
  "xyz",
  "pqr",
  "mno",
  "pqr",
  "abc",
  "pqr",
  "xyz",
  "pqr",
  "mno",
  "pqr",
  "abc",
  "mno",
  "pqr",
  "mno",
  "pqr",
  "xyz",
  "abc",
  "xyz",
  "pqr",
  "pqr",
  "def",
  "zew",
  "def",
  "zew",
  "pqr",
  "mno",
  "pqr",
  "abc",
  "mno",
  "xyz",
  "pqr",
  "mno",
  "pqr",
  "abc",
  "pqr",
  "xyz",
  "pqr",
  "mno",
  "pqr",
  "abc",
  "mno",
  "pqr",
  "mno",
  "pqr",
  "xyz",
  "abc",
  "xyz",
  "pqr",
  "pqr",
  "def",
  "zew",
  "def",
  "zew",
  "pqr",
  "mno",
  "pqr",
  "abc",
  "mno",
];
const newData = [];
(async function () {
  try {
    await fs.writeFile(join(__dirname, fileName), JSON.stringify(newData));
    await Promise.all(
      names.map(async (name) => {
        const data = JSON.parse(
          (await fs.readFile(join(__dirname, fileName))).toString()
        );
        if (!data.find((ele) => ele.name === name)) {
          newData.push({
            id: Math.random(),
            name,
          });
          await fs.writeFile(
            join(__dirname, fileName),
            JSON.stringify(newData)
          );
        }
      })
    );
  } catch (error) {
    console.log(error)
  }
})();