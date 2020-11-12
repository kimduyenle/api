'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CartDetail.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product'
      });
      CartDetail.belongsTo(models.Cart, {
        foreignKey: 'cartId',
        as: 'cart'
      });
    }
  };
  CartDetail.init({
    productId: DataTypes.INTEGER,
    cartId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'CartDetail',
  });
  return CartDetail;
};