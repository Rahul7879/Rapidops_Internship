'use strict';

module.exports = {
  up: async ({ context: queryInterface }) => {
    const createTableQuery = `
    CREATE TABLE folder_permissions (
        folder_id INT,
        tanant_id INT,
        FOREIGN KEY (tanant_id) REFERENCES users(user_id),
        PRIMARY KEY (folder_id, user_id)
    );
    `;

    await queryInterface.sequelize.query(createTableQuery);
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.sequelize.query('DROP TABLE IF EXISTS users_table;');
  },
};
