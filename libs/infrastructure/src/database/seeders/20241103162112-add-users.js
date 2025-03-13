'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert({ tableName: 'users', schema: 'info' }, [
      {
        name: 'john doe',
        username: 'johndoe',
        email: 'johndoe@gmail.com',
        created_at: new Date(),
        updated_at: new Date(),
        cognito_id: 'test',
        uuid: '0a83bc22-adb9-4d25-9fa8-f8d4f2a53511',
      },
      {
        name: 'john doe2',
        username: 'johndoe',
        email: 'johndoe2@gmail.com',
        created_at: new Date(),
        updated_at: new Date(),
        cognito_id: 'test',
        uuid: '0a83bc22-adb9-4d25-9fa8-f8d4f2a53512',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      { tableName: 'users', schema: 'info' },
      null,
      {},
    );
  },
};
