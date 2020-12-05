'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Product.belongsTo(models.User, {
				foreignKey: 'userId',
				as: 'user'
			});
			Product.belongsTo(models.Category, {
				foreignKey: 'categoryId',
				as: 'category'
			});
			Product.hasMany(models.OrderDetail, {
				foreignKey: 'productId',
				as: 'orderDetails'
			});
			Product.hasMany(models.CartDetail, {
				foreignKey: 'productId',
				as: 'cartDetails'
			});
			Product.hasMany(models.Image, {
				foreignKey: 'productId',
				as: 'images'
			});
			Product.hasMany(models.Review, {
				foreignKey: 'productId',
				as: 'reviews'
			});
		}
	}
	Product.init(
		{
			userId: DataTypes.INTEGER,
			categoryId: DataTypes.INTEGER,
			name: DataTypes.STRING,
			description: DataTypes.TEXT,
			quantity: DataTypes.INTEGER,
			price: DataTypes.INTEGER,
			status: DataTypes.BOOLEAN,
			sold: DataTypes.INTEGER,
			isDeleted: DataTypes.BOOLEAN
		},
		{
			sequelize,
			modelName: 'Product'
		}
	);
	return Product;
};
