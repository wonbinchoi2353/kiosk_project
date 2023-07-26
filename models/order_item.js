"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order_item.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      item_id: {
        type: DataTypes.BIGINT,
      },
      amount: {
        type: DataTypes.BIGINT,
      },
      state: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Order_item",
    }
  );
  return Order_item;
};
