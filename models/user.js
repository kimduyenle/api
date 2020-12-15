"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method.
		 */
		static associate(models) {
			// define association here
			User.belongsTo(models.Role, {
				foreignKey: "roleId",
				as: "role" // object gom cac truong ben bang role
			});
			User.hasMany(models.Product, {
				foreignKey: "userId",
				as: "products" //
			});
			User.hasMany(models.Order, {
				foreignKey: "userId",
				as: "orders" //
			});
			User.hasMany(models.Review, {
				foreignKey: "userId",
				as: "reviews" //
			});
			User.hasOne(models.Cart, {
				foreignKey: "userId",
				as: "cart"
			});
			User.hasMany(models.Transaction, {
				foreignKey: "userId",
				as: "transactions" //
			});
		}
	}
	User.init(
		{
			roleId: DataTypes.INTEGER,
			username: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			status: DataTypes.BOOLEAN,
			phoneNumber: DataTypes.STRING,
			address: DataTypes.STRING,
			province: DataTypes.STRING,
			district: DataTypes.STRING,
			avatar: DataTypes.STRING,
			wallet: DataTypes.INTEGER,
			isDeleted: DataTypes.BOOLEAN
		},
		{
			sequelize,
			modelName: "User"
		}
	);
	return User;
};
