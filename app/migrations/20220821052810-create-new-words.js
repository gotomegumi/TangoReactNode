'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('newWords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      korean: {
        type: Sequelize.STRING
      },
      meaning: {
        type: Sequelize.STRING
      },
      pronounce: {
        type: Sequelize.STRING
      },
      section: {
        type: Sequelize.STRING
      },
      learning: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('newWords');
  }
};