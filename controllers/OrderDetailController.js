const _ = require('lodash');
const models = require('../models');
const paginate = require('../utils/paginate');
class OrderDetailController {
	async getAllOrderDetails(req, res) {
		try {
			const orderDetails = await models.OrderDetail.findAll({
				where: { isDeleted: false },
				include: [
					{
						model: models.Product,
						as: 'product'
					},
					{
						model: models.Order,
						as: 'order'
					}
				]
			});
			if (!orderDetails) {
				return res.status(200).json('Order detail not found');
			}
			const data = {};
			data.orderDetails = orderDetails;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async getOrderDetailsPerPage(req, res) {
		try {
			const orderDetails = await models.OrderDetail.findAll({
				where: { isDeleted: false },
				include: [
					{
						model: models.Product,
						as: 'product'
					},
					{
						model: models.Order,
						as: 'order'
					}
				]
			});
			if (!orderDetails) {
				return res.status(200).json('Order detail not found');
			}
			const atPage = parseInt(req.query.page) || 1;
			const limit = parseInt(req.query.limit) || 10;
			const result = paginate(orderDetails, atPage, limit);
			return res.status(200).json(result);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async getOrderDetailsOfOrder(req, res) {
		try {
			const orderId = Number(req.params.orderId);
			const order = await models.Order.findOne({
				where: { id: orderId, isDeleted: false }
			});
			if (!order) {
				return res.status(200).json('Order not found');
			}
			const orderDetails = await models.OrderDetail.findAll({
				where: { orderId: orderId, isDeleted: false },
				include: [
					{
						model: models.Product,
						as: 'product'
					},
					{
						model: models.Order,
						as: 'order'
					}
				]
			});
			if (!orderDetails) {
				return res.status(200).json('Order detail not found');
			}
			const data = {};
			data.orderDetails = orderDetails;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async getOrderDetailsOfProduct(req, res) {
		try {
			const productId = Number(req.params.productId);
			const product = await models.Product.findOne({
				where: { id: productId, isDeleted: false }
			});
			if (!product) {
				return res.status(200).json('Product not found');
			}
			const orderDetails = await models.OrderDetail.findAll({
				where: { productId: productId, isDeleted: false },
				include: [
					{
						model: models.Product,
						as: 'product'
					},
					{
						model: models.Order,
						as: 'order'
					}
				]
			});
			if (!orderDetails) {
				return res.status(200).json('Order detail not found');
			}
			const data = {};
			data.orderDetails = orderDetails;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async getOrderDetail(req, res) {
		try {
			const orderDetail = await models.OrderDetail.findOne({
				where: {
					id: Number(req.params.id),
					isDeleted: false
				},
				include: [
					{
						model: models.Product,
						as: 'product'
					},
					{
						model: models.Order,
						as: 'order'
					}
				]
			});
			if (!orderDetail) {
				return res.status(200).json('Order detail not found');
			}
			const data = {};
			orderDetail.dataValues.product = orderDetail.product.name;
			// orderDetail.dataValues.order = orderDetail.order.id;
			data.orderDetail = orderDetail;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async createOrderDetail(req, res) {
		try {
			const product = await models.Product.findOne({
				where: { id: Number(req.body.productId), isDeleted: false }
			});
			if (!product) {
				return res.status(400).json('Product not found');
			}
			const order = await models.Order.findOne({
				where: { id: Number(req.body.orderId), isDeleted: false }
			});
			if (!order) {
				return res.status(400).json('Order not found');
			}

			const data = req.body;

			const newOrderDetail = await models.OrderDetail.create(data);
			if (!newOrderDetail) {
				return res.status(400).json('Error');
			}
			product.quantity -= req.body.quantity;
			product.sold += req.body.quantity;
			product.save();
			return res.status(201).json(newOrderDetail);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	//   async updateProduct(req, res) {
	//     try {
	//       // get userId trong token
	//       const userId = 2;
	//       const user = await models.User.findOne({ where: { id: userId } });
	//       if (!user) {
	//         return res.status(400).json('User not found');
	//       }
	//       if (req.body.categoryId) {
	//         const category = await models.Category.findOne({
	//           where: { id: Number(req.body.categoryId) }
	//         });
	//         if (!category) {
	//           return res.status(400).json('Category not found');
	//         }
	//       }

	//       const product = await models.Product.findOne({
	//         where: {
	//           id: Number(req.params.id),
	//         },
	//         include: [
	//           {
	//             model: models.User,
	//             as: 'user',
	//           },
	//           {
	//             model: models.Category,
	//             as: 'category',
	// 					}
	// 				],
	//       });
	//       product.categoryId = req.body.categoryId;
	//       product.name = req.body.name;
	//       product.description = req.body.description;
	//       product.quantity = req.body.quantity;
	//       product.price = req.body.price;
	//       product.status = req.body.status;

	//       if (product.save()) {
	//         return res.status(200).json(product);
	//       }
	//       return res.status(400).json('Error');
	//     } catch (error) {
	//       return res.status(400).json(error.message);
	//     }
	//   }
}

module.exports = new OrderDetailController();
