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
    await queryInterface.bulkInsert('labels', [
      {
        product_id: 2,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 3,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 4,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 5,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 6,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 7,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 8,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 9,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 10,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 11,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 12,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 13,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 14,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 15,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 16,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 2,
        category_id: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 3,
        category_id: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 4,
        category_id: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 5,
        category_id: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 6,
        category_id: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 7,
        category_id: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 8,
        category_id: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 9,
        category_id: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 10,
        category_id: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 17,
        category_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 18,
        category_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 19,
        category_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 20,
        category_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 21,
        category_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 21,
        category_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 22,
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 23,
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 24,
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 25,
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 26,
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 27,
        category_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 28,
        category_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 29,
        category_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 30,
        category_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 31,
        category_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 32,
        category_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 33,
        category_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 34,
        category_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 35,
        category_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 36,
        category_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 37,
        category_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 38,
        category_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 39,
        category_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 40,
        category_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 41,
        category_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 42,
        category_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 43,
        category_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 44,
        category_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 45,
        category_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 46,
        category_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 47,
        category_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 48,
        category_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 49,
        category_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 50,
        category_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 51,
        category_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 52,
        category_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 53,
        category_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 54,
        category_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 55,
        category_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 56,
        category_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 57,
        category_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 58,
        category_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 59,
        category_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 60,
        category_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 61,
        category_id: 6,
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
