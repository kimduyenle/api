"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class OrderHistory extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			OrderHistory.belongsTo(models.Order, {
				foreignKey: "orderId",
				as: "order"
			});
		}
	}
	OrderHistory.init(
		{
			orderId: DataTypes.INTEGER,
			name: DataTypes.STRING,
			note: DataTypes.STRING
		},
		{
			sequelize,
			modelName: "OrderHistory"
		}
	);
	return OrderHistory;
};
