'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      { schema: 'info', tableName: 'vehicle' },
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        plate: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        chassis: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        renavam: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        model: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        brand: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        vehicle_year: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        uuid: {
          type: Sequelize.UUID,
          unique: true,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({
      schema: 'info',
      tableName: 'vehicle',
    });
  },
};
