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

    await queryInterface.bulkInsert('stock_histories', [
      {
        product_id: 17,
        transaction_id: 1,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-01' + ''),
        updatedAt: new Date('2023-07-01' + ''),
      },
      {
        product_id: 17,
        transaction_id: 2,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-02' + ''),
        updatedAt: new Date('2023-07-02' + ''),
      },
      {
        product_id: 33,
        transaction_id: 3,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-03' + ''),
        updatedAt: new Date('2023-07-03' + ''),
      },
      {
        product_id: 31,
        transaction_id: 4,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-04' + ''),
        updatedAt: new Date('2023-07-04' + ''),
      },
      {
        product_id: 33,
        transaction_id: 5,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-05' + ''),
        updatedAt: new Date('2023-07-05' + ''),
      },
      {
        product_id: 21,
        transaction_id: 6,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-06' + ''),
        updatedAt: new Date('2023-07-06' + ''),
      },
      {
        product_id: 21,
        transaction_id: 7,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-07' + ''),
        updatedAt: new Date('2023-07-07' + ''),
      },
      {
        product_id: 21,
        transaction_id: 8,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-08' + ''),
        updatedAt: new Date('2023-07-08' + ''),
      },
      {
        product_id: 23,
        transaction_id: 9,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-09' + ''),
        updatedAt: new Date('2023-07-09' + ''),
      },
      {
        product_id: 21,
        transaction_id: 10,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-10' + ''),
        updatedAt: new Date('2023-07-10' + ''),
      },
      {
        product_id: 33,
        transaction_id: 11,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-11' + ''),
        updatedAt: new Date('2023-07-11' + ''),
      },
      {
        product_id: 17,
        transaction_id: 12,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-12' + ''),
        updatedAt: new Date('2023-07-12' + ''),
      },
      {
        product_id: 17,
        transaction_id: 1,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-13' + ''),
        updatedAt: new Date('2023-07-13' + ''),
      },
      {
        product_id: 17,
        transaction_id: 2,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-14' + ''),
        updatedAt: new Date('2023-07-14' + ''),
      },
      {
        product_id: 33,
        transaction_id: 3,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-15' + ''),
        updatedAt: new Date('2023-07-15' + ''),
      },
      {
        product_id: 31,
        transaction_id: 4,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-16' + ''),
        updatedAt: new Date('2023-07-16' + ''),
      },
      {
        product_id: 33,
        transaction_id: 5,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-17' + ''),
        updatedAt: new Date('2023-07-17' + ''),
      },
      {
        product_id: 21,
        transaction_id: 6,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-18' + ''),
        updatedAt: new Date('2023-07-18' + ''),
      },
      {
        product_id: 21,
        transaction_id: 7,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-19' + ''),
        updatedAt: new Date('2023-07-19' + ''),
      },
      {
        product_id: 21,
        transaction_id: 8,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-20' + ''),
        updatedAt: new Date('2023-07-20' + ''),
      },
      {
        product_id: 23,
        transaction_id: 9,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-21' + ''),
        updatedAt: new Date('2023-07-21' + ''),
      },
      {
        product_id: 21,
        transaction_id: 10,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-22' + ''),
        updatedAt: new Date('2023-07-22' + ''),
      },
      {
        product_id: 33,
        transaction_id: 11,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-23' + ''),
        updatedAt: new Date('2023-07-23' + ''),
      },
      {
        product_id: 17,
        transaction_id: 12,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-24' + ''),
        updatedAt: new Date('2023-07-24' + ''),
      },
      {
        product_id: 21,
        transaction_id: 6,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-25' + ''),
        updatedAt: new Date('2023-07-25' + ''),
      },
      {
        product_id: 21,
        transaction_id: 7,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-26' + ''),
        updatedAt: new Date('2023-07-26' + ''),
      },
      {
        product_id: 21,
        transaction_id: 8,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-27' + ''),
        updatedAt: new Date('2023-07-27' + ''),
      },
      {
        product_id: 23,
        transaction_id: 9,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-28' + ''),
        updatedAt: new Date('2023-07-28' + ''),
      },
      {
        product_id: 21,
        transaction_id: 10,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-29' + ''),
        updatedAt: new Date('2023-07-29' + ''),
      },
      {
        product_id: 33,
        transaction_id: 11,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-30' + ''),
        updatedAt: new Date('2023-07-30' + ''),
      },
      {
        product_id: 17,
        transaction_id: 12,
        unit: false,
        stock_history_type_id: 4,
        qty: 2,
        action: 'OUT',
        total_stock: null,
        notes: null,
        createdAt: new Date('2023-07-31' + ''),
        updatedAt: new Date('2023-07-31' + ''),
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
