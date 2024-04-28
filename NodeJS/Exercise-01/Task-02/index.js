const fs = require('fs').promises;
const crypto = require('crypto');
const readline = require('readline');
const path = require('path');
const { stdin: input, stdout: output } = require('process');
const databaseFilePath = path.join(__dirname, 'dataBase.json'); 
const rl = readline.createInterface({ input, output });

function generateSalt(length = 16) {
    return crypto.randomBytes(length).toString('hex');
}

function hashPassword(password) {
    const salt = generateSalt();
    const hash = crypto.createHmac('sha256', salt);
    hash.update(password);
    return {
        salt,
        hashedPassword: hash.digest('hex')
    };
}

function verifyPassword(storedHash, storedSalt, passwordToVerify) {
    const hash = crypto.createHmac('sha256', storedSalt);
    hash.update(passwordToVerify);
    return hash.digest('hex') === storedHash;
}

async function signupUser(username, password) {
    try {
        const dataBase = await fs.readFile(databaseFilePath, "utf-8");
        const userDatabase = JSON.parse(dataBase);
        if (userDatabase[username]) {
            console.log("User already exists");
            return;
        }
        userDatabase[username] = { password: hashPassword(password) };
        await fs.writeFile(databaseFilePath, JSON.stringify(userDatabase));
        console.log("Congratulations! Sign up complete");
    } catch (err) {
        if (err.code === 'ENOENT') {
            const userDatabase = { [username]: { password: hashPassword(password) } };
            await fs.writeFile(databaseFilePath, JSON.stringify(userDatabase));
            console.log("Congratulations! Sign up complete");
        } else {
            throw err;
        }
    }
}

async function loginUser(username, password) {
    try {
        const dataBase = await fs.readFile(databaseFilePath, "utf-8");
        const userDatabase = JSON.parse(dataBase);
        if (!userDatabase[username]) {
            console.log("User does not exist!");
            return;
        }
        const { hashedPassword, salt } = userDatabase[username].password;
        if (verifyPassword(hashedPassword, salt, password)) {
            console.log("Welcome", username);
        } else {
            console.log("Wrong password");
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log("user does not exist!");
        } else {
            throw err;
        }
    }
}

async function prompt(questionText) {
    return new Promise((resolve) => {
        rl.question(questionText, (answer) => {
            resolve(answer);
        });
    });
}

async function getUserInput() {
    try {
        const action = await prompt('Enter action (login or signup): ');
        if (action !== "login" && action !== "signup") {
            console.log("\nInvalid Action");
            return;
        }

        const username = await prompt('Enter username: ');
        if (!username.trim()) {
            throw new Error("Username cannot be empty.");
        }

        const password = await prompt('Enter Password: ');

        if (!password.trim()) {
            throw new Error("Password cannot be empty.");
        }

        if (action === "login") {
            await loginUser(username, password);
        } else if (action === "signup") {
            await signupUser(username, password);
        }
    } catch (err) {
        console.log(err.message);
    } finally {
        rl.close();
    }
}

getUserInput();
