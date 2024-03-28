import mysql from 'mysql2/promise';

const dbcon = async function main() {
  try {
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'rahul',
      password: 'Rahul@123',
      database: 'rapid_page_builder'
    });
    console.log("Connected");
    return conn;
  } catch (err) {
    console.log(err);
  }
}

export default dbcon;
