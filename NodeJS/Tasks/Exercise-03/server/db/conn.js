const mysql = require('mysql2/promise');

const dbcon = async function main() {
    try {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'rahul',
            password: 'Rahul@123',
            database: 'exercise_03'
        });
        console.log("Connected");
        return conn;
    } catch (err) {
        console.log(err);
    }
}

module.exports = dbcon;


