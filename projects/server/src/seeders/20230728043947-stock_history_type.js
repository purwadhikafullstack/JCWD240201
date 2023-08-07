'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('stock_history_types', [
      {
        type: 'add stock',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'stock opname',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'unit convertion',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'sales',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};