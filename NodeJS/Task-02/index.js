const fs = require("fs");
const crypto = require("crypto");
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });


function generateSalt(length = 16) {
    return crypto.randomBytes(length).toString('hex');
}

function hashPassword(password) {
    let salt = generateSalt()
    const hash = crypto.createHmac('sha256', salt);
    hash.update(password);
    const value = hash.digest('hex');
    return {
        salt: salt,
        hashedPassword: value
    };
}

function verifyPassword(storedHash, storedSalt, passwordToVerify) {
    const hash = crypto.createHmac('sha256', storedSalt);
    hash.update(passwordToVerify);
    const value = hash.digest('hex');
    return value === storedHash;
}

let userSignup = (username, password) => {
    fs.readFile("./dataBase.json", "utf-8", (err, data) => {
        let dataBase = {}
        if (err) {
            dataBase[username] = { password: hashPassword(password) }
            fs.writeFile('./dataBase.json', JSON.stringify(dataBase), () => {
                console.log("new db file created");
            })
        } else {
            dataBase = JSON.parse(data);
            if (dataBase[username] !== undefined) {
                console.log("user already exists")
                return;
            } else {
                dataBase[username] = { password: hashPassword(password) }
                fs.writeFile('./dataBase.json', JSON.stringify(dataBase), () => {
                    console.log("Congratulations! Sign up complete")
                })
            }
        }
    })
}


let userLogin = (username, password) => {
    fs.readFile('./dataBase.json', "utf-8", (err, data) => {
        let dataBase = JSON.parse(data);
        if (dataBase[username] === undefined) {
            console.log("User Not Exists!");
            return
        } else {
            let hashPassword = dataBase[username].password.hashedPassword;
            let salt = dataBase[username].password.salt;
            if (verifyPassword(hashPassword, salt, password)) {
                console.log("Welcome", username);
            } else {
                console.log("Wrong password")
            }
        }
    })
}


rl.question('Enter action: ', (action) => {
    rl.question('Enter name: ', (name) => {

        rl.stdoutMute = true;
        output.write('Enter password: ');
        rl.on('line', (password) => {
            rl.stdoutMute = false;

            if (action === "login") {
                userLogin(name, password);
            } else if (action === "signup") {
                userSignup(name, password);
            }
            console.log("\n")
            rl.close();
        });
        rl._writeToOutput = function _writeToOutput(stringToWrite) {
            if (rl.stdoutMute)
                output.write("*");
            else
                output.write(stringToWrite);
        };
    });
});