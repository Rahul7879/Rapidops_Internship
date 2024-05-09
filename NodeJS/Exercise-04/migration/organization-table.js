'use strict';

module.exports = {
  up: async ({ context: queryInterface }) => {
    const createTableQuery = `
    CREATE TABLE organizations (
        tanant_id INT AUTO_INCREMENT PRIMARY KEY,
        owner_id INT NOT NULL,
        email_id VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
    );
    `;

    await queryInterface.sequelize.query(createTableQuery);
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.sequelize.query('DROP TABLE IF EXISTS users_table;');
  },
};
