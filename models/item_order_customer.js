"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item_order_customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Order_customer, {
        foreignKey: "order_customer_id",
        onDelete: "CASCADE",
      });
      this.belongsTo(models.Item, {
        foreignKey: "item_id",
        onDelete: "CASCADE",
      });
    }
  }
  Item_order_customer.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      item_id: {
        type: DataTypes.BIGINT,
      },
      order_customer_id: {
        type: DataTypes.BIGINT,
      },
      amount: {
        type: DataTypes.BIGINT,
      },
      option: {
        type: DataTypes.JSON,
      },
      price: {
        type: DataTypes.BIGINT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Item_order_customer",
    }
  );
  return Item_order_customer;
};
