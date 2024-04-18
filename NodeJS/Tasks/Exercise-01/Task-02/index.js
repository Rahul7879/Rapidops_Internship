const fs = require("fs");
const crypto = require("crypto");
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });


const encryption_key = "byz9VFNtbRQM0yBODcCb1lrUtVVH3D3x";
const initialization_vector = "X05IGQ5qdBnIqAWD";

let incrptPassword = (password) => {
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryption_key), Buffer.from(initialization_vector))
    var crypted = cipher.update(password, 'utf8', 'hex')
    crypted += cipher.final('hex')
    return crypted
}

let decryptPassword = (hashedPassword) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryption_key), Buffer.from(initialization_vector))
    let dec = decipher.update(hashedPassword, 'hex', 'utf8')
    dec += decipher.final('utf8')
    return dec
}


let userSignup = (username, password) => {
    fs.readFile("./dataBase.json", "utf-8", (err, data) => {
        let dataBase = {}
        if (err) {
            dataBase[username] = { password: incrptPassword(password) }
            console.log(JSON.stringify(dataBase));
            fs.writeFile('./dataBase.json', JSON.stringify(dataBase), () => {
                console.log("new db file created");
            })
        } else {
            dataBase = JSON.parse(data);

            if (dataBase[username] !== undefined) {
                console.log("user already exists")
                return;
            } else {
                dataBase[username] = { password: incrptPassword(password) }
                console.log(JSON.stringify(dataBase));
                fs.writeFile('./dataBase.json', JSON.stringify(dataBase), () => {
                    console.log("user added");
                })
                console.log("sigup successfully")
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
            if (password === decryptPassword(dataBase[username].password)) {
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