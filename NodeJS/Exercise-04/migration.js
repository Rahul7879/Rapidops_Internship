const { Sequelize } = require("sequelize");
const { Umzug, SequelizeStorage } = require("umzug");
 
const sequelize = new Sequelize({
  database: 'exercise_04',
  username: 'rahul',
  password: 'Rahul@123',
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  pool: {
    max: 10,
    min: 2,  
    idle: 10000,
  },
});
const umzug = new Umzug({
  migrations: { glob: "migration/*.js" },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});
 
umzug.up();