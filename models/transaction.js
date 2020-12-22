"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Transaction extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Transaction.belongsTo(models.Order, {
				foreignKey: "orderId",
				as: "order"
			});
			Transaction.belongsTo(models.User, {
				foreignKey: "userId",
				as: "user"
			});
		}
	}
	Transaction.init(
		{
			userId: DataTypes.INTEGER,
			orderId: DataTypes.INTEGER,
			payoutId: DataTypes.STRING,
			amount: DataTypes.INTEGER,
			status: DataTypes.STRING
		},
		{
			sequelize,
			modelName: "Transaction"
		}
	);
	return Transaction;
};
