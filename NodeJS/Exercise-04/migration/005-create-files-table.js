'use strict';

module.exports = {
  up: async ({ context: queryInterface }) => {
    const createTableQuery = `
    CREATE TABLE files (
        file_id INT AUTO_INCREMENT PRIMARY KEY,
        folder_id INT,
        name VARCHAR(255) NOT NULL,
        content LONGBLOB,
        FOREIGN KEY (folder_id) REFERENCES folders(folder_id) ON DELETE CASCADE
        );
        `;

    await queryInterface.sequelize.query(createTableQuery);
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.sequelize.query('DROP TABLE IF EXISTS users_table;');
  },
};
