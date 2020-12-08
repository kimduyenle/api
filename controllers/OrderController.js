const _ = require('lodash');
const models = require('../models');
const paginate = require('../utils/paginate');
const getUserInfo = require('../utils/getUserInfo');
class OrderController {
	async getAllOrders(req, res) {
		try {
			const orders = await models.Order.findAll({
				where: { isDeleted: false },
				include: [
					{
						model: models.User,
						as: 'user'
					},
					{
						model: models.Status,
						as: 'status'
					},
					{
						model: models.Transportation,
						as: 'transportation'
					},
					{
						model: models.OrderDetail,
						as: 'orderDetails',
						include: [
							{
								model: models.Product,
								as: 'product'
							}
						]
					}
				]
			});
			if (!orders) {
				return res.status(200).json('Order not found');
			}
			const data = {};
			data.orders = orders;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async getOrdersPerPage(req, res) {
		try {
			const orders = await models.Order.findAll({
				where: { isDeleted: false },
				include: [
					{
						model: models.User,
						as: 'user'
					},
					{
						model: models.Status,
						as: 'status'
					},
					{
						model: models.Transportation,
						as: 'transportation'
					},
					{
						model: models.OrderDetail,
						as: 'orderDetails'
					}
				]
			});
			if (!orders) {
				return res.status(200).json('Order not found');
			}
			const atPage = parseInt(req.query.page) || 1;
			const limit = parseInt(req.query.limit) || 10;
			const result = paginate(orders, atPage, limit);
			return res.status(200).json(result);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async getOrdersOfUser(req, res) {
		try {
			// get userId trong token va kiem tra
			const userFromToken = await getUserInfo(req);
			const userId = userFromToken.id;
			const user = await models.User.findOne({
				where: { id: userId, isDeleted: false }
			});
			if (!user) {
				return res.status(200).json('User not found');
			}

			const statusId = Number(req.query.statusId) || 1;
			const status = await models.Status.findOne({
				where: { id: statusId, isDeleted: false }
			});
			if (!status) {
				return res.status(200).json('Status not found');
			}

			const orders = await models.Order.findAll({
				where: { userId: userId, statusId: statusId, isDeleted: false },
				order: [['createdAt', 'DESC']],
				include: [
					{
						model: models.User,
						as: 'user'
					},
					{
						model: models.Status,
						as: 'status'
					},
					{
						model: models.Transportation,
						as: 'transportation'
					},
					{
						model: models.OrderDetail,
						as: 'orderDetails',
						include: [
							{
								model: models.Product,
								as: 'product',
								where: { isDeleted: false },
								include: [
									{
										model: models.User,
										as: 'user'
									},
									{
										model: models.Image,
										as: 'images'
									}
								]
							}
						]
					}
				]
			});
			if (!orders) {
				return res.status(200).json('Order not found');
			}
			// const data = {};
			// data.orders = orders;
			// return res.status(200).json(data);

			const atPage = parseInt(req.query.page) || 1;
			const limit = parseInt(req.query.limit) || 10;
			const result = paginate(orders, atPage, limit);
			return res.status(200).json(result);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async getOrdersOfOwner(req, res) {
		try {
			// get userId trong token va kiem tra
			const userFromToken = await getUserInfo(req);
			const userId = userFromToken.id;
			const user = await models.User.findOne({
				where: { id: userId, isDeleted: false }
			});
			if (!user) {
				return res.status(200).json('User not found');
			}

			const statusId = Number(req.query.statusId) || 1;
			const status = await models.Status.findOne({
				where: { id: statusId, isDeleted: false }
			});
			if (!status) {
				return res.status(200).json('Status not found');
			}

			const orders = await models.Order.findAll({
				where: { statusId: statusId, isDeleted: false },
				order: [['createdAt', 'DESC']],
				include: [
					{
						model: models.User,
						as: 'user'
					},
					{
						model: models.Status,
						as: 'status'
					},
					{
						model: models.Transportation,
						as: 'transportation'
					},
					{
						model: models.OrderDetail,
						as: 'orderDetails',
						required: true,
						include: [
							{
								model: models.Product,
								as: 'product',
								where: { userId: userId, isDeleted: false },
								include: [
									{
										model: models.User,
										as: 'user'
									},
									{
										model: models.Image,
										as: 'images'
									}
								]
							}
						]
					}
				]
			});
			if (!orders) {
				return res.status(200).json('Order not found');
			}
			// const data = {};
			// data.orders = orders;
			// return res.status(200).json(data);

			const atPage = parseInt(req.query.page) || 1;
			const limit = parseInt(req.query.limit) || 10;
			const result = paginate(orders, atPage, limit);
			return res.status(200).json(result);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async getOrdersOfStatus(req, res) {
		try {
			const statusId = Number(req.params.statusId);
			const status = await models.Status.findOne({
				where: { id: statusId, isDeleted: false }
			});
			if (!status) {
				return res.status(200).json('Status not found');
			}
			const orders = await models.Order.findAll({
				where: { statusId: statusId, isDeleted: false },
				include: [
					{
						model: models.User,
						as: 'user'
					},
					{
						model: models.Status,
						as: 'status'
					},
					{
						model: models.Transportation,
						as: 'transportation'
					},
					{
						model: models.OrderDetail,
						as: 'orderDetails'
					}
				]
			});
			if (!orders) {
				return res.status(200).json('Order not found');
			}
			const data = {};
			data.orders = orders;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async getOrder(req, res) {
		try {
			const order = await models.Order.findOne({
				where: {
					id: Number(req.params.id),
					isDeleted: false
				},
				include: [
					{
						model: models.User,
						as: 'user'
					},
					{
						model: models.Status,
						as: 'status'
					},
					{
						model: models.Transportation,
						as: 'transportation'
					},
					{
						model: models.OrderDetail,
						as: 'orderDetails',
						include: [
							{
								model: models.Product,
								as: 'product',
								include: [
									{
										model: models.User,
										as: 'user'
									},
									{
										model: models.Image,
										as: 'images'
									}
								]
							}
						]
					}
				]
			});
			if (!order) {
				return res.status(200).json('Order not found');
			}
			const data = {};
			// order.dataValues.user = order.user.username;
			// order.dataValues.status = order.status.name;
			data.order = order;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async createOrder(req, res) {
		try {
			// get userId trong token va kiem tra
			const userFromToken = await getUserInfo(req);
			const userId = userFromToken.id;
			const user = await models.User.findOne({
				where: { id: userId, isDeleted: false }
			});
			if (!user) {
				return res.status(400).json('User not found');
			}
			const status = await models.Status.findOne({
				where: { id: 1, isDeleted: false }
			});
			if (!status) {
				return res.status(400).json('Status not found');
			}

			const data = req.body;
			// if (!req.body.deliveryPhoneNumber) {
			// 	data.deliveryPhoneNumber = user.phoneNumber;
			// }
			// if (!req.body.deliveryAddress) {
			// 	data.deliveryAddress = user.address;
			// }
			data.userId = userId;
			data.statusId = status.id;

			const newOrder = await models.Order.create(data);
			if (!newOrder) {
				return res.status(400).json('Error');
			}
			return res.status(201).json(newOrder);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async updateOrder(req, res) {
		try {
			const orderDetails = await models.OrderDetail.findAll({
				where: {
					orderId: Number(req.params.id),
					isDeleted: false
				},
				include: [
					{
						model: models.Product,
						as: 'product'
					}
				]
			});
			if (orderDetails.length === 0) {
				return res.status(400).json('Order not found');
			}

			const userFromToken = await getUserInfo(req);
			const userId = userFromToken.id;
			if (orderDetails[0].product.userId !== userId) {
				return res.status(400).json('Current user cannot update order status');
			}

			const order = await models.Order.findOne({
				where: {
					id: Number(req.params.id),
					isDeleted: false
				}
			});
			order.paymentMethod = req.body.paymentMethod;
			order.deliveryPhoneNumber = req.body.deliveryPhoneNumber;
			order.deliveryAddress = req.body.deliveryAddress;

			if (order.save()) {
				return res.status(200).json(order);
			}
			return res.status(400).json('Error');
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async updateOrderStatus(req, res) {
		try {
			const orderDetails = await models.OrderDetail.findAll({
				where: {
					orderId: Number(req.params.id),
					isDeleted: false
				},
				include: [
					{
						model: models.Product,
						as: 'product'
					}
				]
			});
			if (orderDetails.length === 0) {
				return res.status(400).json('Order not found');
			}

			const userFromToken = await getUserInfo(req);
			const userId = userFromToken.id;
			// if (orderDetails[0].product.userId !== userId) {
			// 	return res.status(400).json('Current user cannot update order status');
			// }

			const order = await models.Order.findOne({
				where: {
					id: Number(req.params.id),
					isDeleted: false
				}
				// include: [
				//   {
				//     model: models.User,
				//     as: 'user',
				//   },
				//   {
				//     model: models.Status,
				//     as: 'status',
				//   },
				//   {
				//     model: models.OrderDetail,
				//     as: 'orderDetails',
				//   },
				// ],
			});
			order.statusId = req.body.statusId;

			if (order.save()) {
				return res.status(200).json(order);
			}
			return res.status(400).json('Error');
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async deleteOrder(req, res) {
		try {
			const order = await models.Order.findOne({
				where: {
					id: Number(req.params.id),
					isDeleted: false
				}
			});
			order.isDeleted = true;

			if (order.save()) {
				return res.status(200).json(order);
			}
			return res.status(400).json('Error');
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}
}

module.exports = new OrderController();
