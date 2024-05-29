require('dotenv').config();
const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');

// Initialize Sequelize
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: 'postgres', 
  port: process.env.DB_PORT,
  pool: {
    max: 10,
    min: 2,
    idle: 10000,
  },
});

// Configure Umzug for migrations
const umzug = new Umzug({
  migrations: { glob: 'migration/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

// Run all pending migrations
umzug.up().then(() => {
  console.log('All migrations performed successfully');
}).catch(err => {
  console.error('Migration failed', err);
});

module.exports = sequelize;
