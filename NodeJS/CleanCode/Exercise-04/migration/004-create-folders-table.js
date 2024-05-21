'use strict';

module.exports = {
  up: async ({ context: queryInterface }) => {
    const createTableQuery = `
    CREATE TABLE folders (
        folder_id INT PRIMARY KEY AUTO_INCREMENT,
        tenant_id INT NOT NULL,
        folder_name VARCHAR(255),
        parent_folder_id INT,
        FOREIGN KEY (tenant_id) REFERENCES organizations(tenant_id) ON DELETE CASCADE,
        FOREIGN KEY (parent_folder_id) REFERENCES folders(folder_id) ON DELETE CASCADE
        );
        `;  

    await queryInterface.sequelize.query(createTableQuery);
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.sequelize.query('DROP TABLE IF EXISTS folder;');
  },
};
