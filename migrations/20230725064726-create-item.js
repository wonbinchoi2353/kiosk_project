"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Items", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      item: {
        type: Sequelize.STRING,
      },
      option_id: {
        type: Sequelize.BIGINT,
        defaultValue: 0,
      },
      price: {
        type: Sequelize.BIGINT,
      },
      type: {
        type: Sequelize.ENUM(["coffee", "juice", "food"]),
      },
      amount: {
        type: Sequelize.BIGINT,
        defaultValue: 0,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Items");
  },
};
