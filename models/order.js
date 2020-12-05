'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Order extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Order.belongsTo(models.User, {
				foreignKey: 'userId',
				as: 'user'
			});
			Order.belongsTo(models.Status, {
				foreignKey: 'statusId',
				as: 'status'
			});
			Order.hasMany(models.OrderDetail, {
				foreignKey: 'orderId',
				as: 'orderDetails'
			});
			Order.belongsTo(models.Transportation, {
				foreignKey: 'transId',
				as: 'transportation'
			});
		}
	}
	Order.init(
		{
			userId: DataTypes.INTEGER,
			statusId: DataTypes.INTEGER,
			paymentMethod: DataTypes.STRING,
			deliveryPhoneNumber: DataTypes.STRING,
			deliveryAddress: DataTypes.STRING,
			province: DataTypes.STRING,
			district: DataTypes.STRING,
			transId: DataTypes.INTEGER,
			isDeleted: DataTypes.BOOLEAN
		},
		{
			sequelize,
			modelName: 'Order'
		}
	);
	return Order;
};
