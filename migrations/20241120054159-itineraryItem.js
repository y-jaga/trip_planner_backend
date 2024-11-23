'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('itineraryItems', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      itineraryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'itineraries', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      itemId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING, // 'Flight', 'Hotel', 'Site'
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('itineraryItems');
  }
};
