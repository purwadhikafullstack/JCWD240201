'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product_type.hasMany(models.product, {
        foreignKey: 'product_type_id',
      });
    }
  }
  product_type.init(
    {
      type_name: DataTypes.STRING,
      unit: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'product_type',
    },
  );
  return product_type;
};
