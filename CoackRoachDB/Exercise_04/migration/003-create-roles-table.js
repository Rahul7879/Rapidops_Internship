'use strict';

module.exports = {
  up: async ({ context: queryInterface }) => {
    const createTableQuery = `
      CREATE TABLE roles (
        role_id SERIAL PRIMARY KEY, -- Use SERIAL for auto-increment
        role_name VARCHAR(255) NOT NULL,
        tenant_id INT NOT NULL,
        permissions VARCHAR(10) DEFAULT '1000', 
        user_id INT,
        temp_user INT,
        temp_user_expiry TIMESTAMP, -- Use TIMESTAMP for datetime type
        folders JSONB, -- Use JSONB for JSON columns
        status VARCHAR(255) DEFAULT 'empty'
      );
    `;

    await queryInterface.sequelize.query(createTableQuery);
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.sequelize.query('DROP TABLE IF EXISTS roles;');
  },
};
