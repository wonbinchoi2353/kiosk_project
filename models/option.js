"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Option.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.DATE,
      },
      extra_price: {
        type: DataTypes.BIGINT,
      },
      shot_price: {
        type: DataTypes.BIGINT,
      },
      hot: {
        type: DataTypes.BIGINT,
      },
    },
    {
      sequelize,
      modelName: "Option",
    }
  );
  return Option;
};
