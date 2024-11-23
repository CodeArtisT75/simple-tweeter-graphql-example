'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tweets', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      authorId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      hashtags: {
        type: Sequelize.JSON,
        default: [],
      },
      parentTweetId: {
        type: Sequelize.BIGINT.UNSIGNED,
        references: {
          model: 'tweets',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      category: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('tweets');
  },
};
