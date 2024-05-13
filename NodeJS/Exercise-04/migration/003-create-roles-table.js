'use strict';

module.exports = {
  up: async ({ context: queryInterface }) => {
    const createTableQuery = `
      CREATE TABLE roles (
        role_id INT PRIMARY KEY AUTO_INCREMENT,
        role_name VARCHAR(255) NOT NULL,
        tenant_id int NOT NULL,
        permissions VARCHAR(10) DEFAULT '1000',
        user_id INT,
        folders JSON,
        status VARCHAR(255) DEFAULT 'empty',
        FOREIGN KEY (tenant_id) REFERENCES organizations(tenant_id)
      );
    `;

    await queryInterface.sequelize.query(createTableQuery);
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.sequelize.query('DROP TABLE IF EXISTS users_table;');
  },
};
