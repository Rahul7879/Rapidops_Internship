'use strict';

module.exports = {
  up: async ({ context: queryInterface }) => {
    const createTableQuery = `
      CREATE TABLE users_table (
        tanant_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        isAdmin boolean,
        role_id INT
      );
    `;

    await queryInterface.sequelize.query(createTableQuery);
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.sequelize.query('DROP TABLE IF EXISTS users_table;');
  },
};
