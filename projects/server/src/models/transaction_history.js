'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transaction_history.init(
    {
      transaction_id: DataTypes.INTEGER,
      transaction_status_id: DataTypes.INTEGER,
      is_active: DataTypes.BOOLEAN,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'transaction_history',
    },
  );
  return transaction_history;
};