'use strict';

module.exports = {
  up: async ({ context: queryInterface }) => {
    const createTableQuery = `
    CREATE TABLE organizations (
        tenant_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        admin_id INT NOT NULL,
        FOREIGN KEY (admin_id) REFERENCES users(user_id)
    );
    `;

    await queryInterface.sequelize.query(createTableQuery);
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.sequelize.query('DROP TABLE IF EXISTS users_table;');
  },
};
