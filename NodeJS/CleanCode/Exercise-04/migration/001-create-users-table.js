'use strict';

module.exports = {
  up: async ({ context: queryInterface }) => {
    const createTableQuery = `
      CREATE TABLE users (
        user_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        my_tenant INT,  
        added_in JSON   
      );
    `;

    await queryInterface.sequelize.query(createTableQuery);
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.sequelize.query('DROP TABLE IF EXISTS users;');
  },
};
