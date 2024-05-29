'use strict';

module.exports = {
  up: async ({ context: queryInterface }) => {
    const createTableQuery = `
      CREATE TABLE files (
        file_id SERIAL PRIMARY KEY, -- Use SERIAL for auto-increment
        folder_id INT,
        name VARCHAR(255) NOT NULL,
        file_path TEXT,
        FOREIGN KEY (folder_id) REFERENCES folders(folder_id) ON DELETE CASCADE
      );
    `;

    await queryInterface.sequelize.query(createTableQuery);
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.sequelize.query('DROP TABLE IF EXISTS files;');
  },
};
