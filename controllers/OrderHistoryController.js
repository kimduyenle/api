const _ = require("lodash");
const models = require("../models");
const paginate = require("../utils/paginate");
const getUserInfo = require("../utils/getUserInfo");
class OrderHistoryController {
	async getAllOrderHistories(req, res) {
		try {
			const orderHistories = await models.OrderHistory.findAll();
			if (!orderHistories) {
				return res.status(200).json("Order history not found");
			}
			const data = {};
			data.orderHistories = orderHistories;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async getOrderHistoriesOfOrder(req, res) {
		try {
			const orderId = Number(req.params.orderId);
			const order = await models.Order.findOne({
				where: { id: orderId, isDeleted: false }
			});
			if (!order) {
				return res.status(400).json("Order not found");
			}
			const orderHistories = await models.OrderHistory.findAll({
				where: { orderId: orderId }
			});
			if (!orderHistories) {
				// return res.status(200).json('Cart not found');
				return res.status(200).json(orderHistories);
			}
			const data = {};
			data.orderHistories = orderHistories;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async getOrderHistory(req, res) {
		try {
			const orderHistory = await models.OrderHistory.findOne({
				where: {
					id: Number(req.params.id)
				}
			});
			if (!orderHistory) {
				return res.status(200).json("Order history not found");
			}
			const data = {};
			// cart.dataValues.user = cart.user.username;
			// orderDetail.dataValues.order = orderDetail.order.id;
			data.orderHistory = orderHistory;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async createOrderHistory(req, res) {
		try {
			const orderId = Number(req.body.orderId);

			const order = await models.Order.findOne({
				where: { id: orderId, isDeleted: false }
			});
			if (!order) {
				return res.status(400).json("Order not found");
			}

			const data = req.body;
			data.orderId = orderId;
			const newOrderHistory = await models.OrderHistory.create(data);
			if (!newOrderHistory) {
				return res.status(400).json("Error");
			}
			return res.status(201).json(newOrderHistory);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	// async deleteCart(req, res) {
	// 	try {
	// 		const cart = await models.Cart.findOne({
	// 			where: {
	// 				id: Number(req.params.cartId),
	// 				isDeleted: false
	// 			}
	// 		});
	// 		cart.isDeleted = true;

	// 		if (cart.save()) {
	// 			return res.status(200).json(cart);
	// 		}
	// 		return res.status(400).json("Error");
	// 	} catch (error) {
	// 		return res.status(400).json(error.message);
	// 	}
	// }
}

module.exports = new OrderHistoryController();
