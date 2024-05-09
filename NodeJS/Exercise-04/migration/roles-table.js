'use strict';

module.exports = {
  up: async ({ context: queryInterface }) => {
    const createTableQuery = `
      CREATE TABLE roles_table (
        role_id INT PRIMARY KEY AUTO_INCREMENT,
        role_name VARCHAR(255) NOT NULL,
        tanant_id VARCHAR(255) NOT NULL,
        permissions VARCHAR(255) NOT NULL DEFAULT "read"
      );
    `;

    await queryInterface.sequelize.query(createTableQuery);
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.sequelize.query('DROP TABLE IF EXISTS users_table;');
  },
};
