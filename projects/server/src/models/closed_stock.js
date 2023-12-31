'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class closed_stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      closed_stock.belongsTo(models.product, {
        foreignKey: 'product_id',
      });
    }
  }
  closed_stock.init(
    {
      product_id: DataTypes.INTEGER,
      exp_date: DataTypes.DATEONLY,
      total_stock: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'closed_stock',
    },
  );
  return closed_stock;
};
