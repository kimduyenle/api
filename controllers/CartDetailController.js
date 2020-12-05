const _ = require('lodash');
const models = require('../models');
const paginate = require('../utils/paginate');
class CartDetailController {
	async getAllCartDetails(req, res) {
		try {
			const cartDetails = await models.CartDetail.findAll({
				where: { isDeleted: false },
				include: [
					{
						model: models.Product,
						as: 'product'
					},
					{
						model: models.Cart,
						as: 'cart'
					}
				]
			});
			if (!cartDetails) {
				return res.status(200).json('Cart detail not found');
			}
			const data = {};
			data.cartDetails = cartDetails;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async getCartDetailsPerPage(req, res) {
		try {
			const cartDetails = await models.CartDetail.findAll({
				where: { isDeleted: false },
				include: [
					{
						model: models.Product,
						as: 'product'
					},
					{
						model: models.Cart,
						as: 'cart'
					}
				]
			});
			if (!cartDetails) {
				return res.status(200).json('Cart detail not found');
			}
			const atPage = parseInt(req.query.page) || 1;
			const limit = parseInt(req.query.limit) || 10;
			const result = paginate(cartDetails, atPage, limit);
			return res.status(200).json(result);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async getCartDetailsOfCart(req, res) {
		try {
			const cartId = Number(req.params.cartId);
			const cart = await models.Cart.findOne({
				where: { id: cartId, isDeleted: false }
			});
			if (!cart) {
				return res.status(200).json('Cart not found');
			}
			const cartDetails = await models.CartDetail.findAll({
				where: { cartId: cartId, isDeleted: false },
				include: [
					{
						model: models.Product,
						as: 'product',
						include: [
							{
								model: models.User,
								as: 'user'
							}
						]
					},
					{
						model: models.Cart,
						as: 'cart'
					}
				]
			});
			if (!cartDetails) {
				return res.status(200).json('Cart detail not found');
			}
			const data = {};
			data.cartDetails = cartDetails;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async getCartDetailsOfOwner(req, res) {
		try {
			const cartId = Number(req.params.cartId);
			const cart = await models.Cart.findOne({
				where: { id: cartId, isDeleted: false }
			});
			if (!cart) {
				return res.status(200).json('Cart not found');
			}
			const cartDetails = await models.CartDetail.findAll({
				where: { cartId: cartId, isDeleted: false },
				group: ['price'],
				include: [
					{
						model: models.Product,
						as: 'product',
						include: [
							{
								model: models.User,
								as: 'user'
							}
						]
					},
					{
						model: models.Cart,
						as: 'cart'
					}
				]
			});
			if (!cartDetails) {
				return res.status(200).json('Cart detail not found');
			}
			const data = {};
			data.cartDetails = cartDetails;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	// async getOrderDetailsOfProduct(req, res) {
	//   try {
	//     const productId = Number(req.params.productId);
	//     const product = await models.Product.findOne({ where: { id: productId, isDeleted: false } });
	//     if (!product) {
	//       return res.status(200).json('Product not found');
	//     }
	//     const orderDetails = await models.OrderDetail.findAll({
	//       where: { productId: productId, isDeleted: false },
	//       include: [
	//         {
	//           model: models.Product,
	//           as: 'product',
	//         },
	//         {
	//           model: models.Order,
	//           as: 'order',
	// 				}
	// 			],
	//     });
	//     if (!orderDetails) {
	//       return res.status(200).json('Order detail not found');
	//     }
	//     const data = {};
	//     data.orderDetails = orderDetails;
	//     return res.status(200).json(data);
	//   } catch (error) {
	//     return res.status(400).json(error.message)
	//   }
	// }

	async getCartDetail(req, res) {
		try {
			const cartDetail = await models.CartDetail.findOne({
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
						model: models.Cart,
						as: 'cart'
					}
				]
			});
			if (!cartDetail) {
				return res.status(200).json('Cart detail not found');
			}
			const data = {};
			cartDetail.dataValues.product = cartDetail.product.name;
			data.cartDetail = cartDetail;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async createCartDetail(req, res) {
		try {
			const product = await models.Product.findOne({
				where: { id: Number(req.body.productId), isDeleted: false }
			});
			if (!product) {
				return res.status(400).json('Product not found');
			}
			const cart = await models.Cart.findOne({
				where: { id: Number(req.body.cartId), isDeleted: false }
			});
			if (!cart) {
				return res.status(400).json('Cart not found');
			}
			const cartDetail = await models.CartDetail.findOne({
				where: {
					productId: Number(req.body.productId),
					cartId: Number(req.body.cartId),
					isDeleted: false
				}
			});
			if (!cartDetail) {
				const data = req.body;

				const newCartDetail = await models.CartDetail.create(data);
				if (!newCartDetail) {
					return res.status(400).json('Error');
				}
				return res.status(201).json(newCartDetail);
			}

			cartDetail.quantity += req.body.quantity;

			if (cartDetail.save()) {
				return res.status(200).json(cartDetail);
			}
			return res.status(400).json('Error');
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async updateCartDetailQuantity(req, res) {
		try {
			if (req.body.productId) {
				const product = await models.Product.findOne({
					where: { id: Number(req.body.productId), isDeleted: false }
				});
				if (!product) {
					return res.status(400).json('Product not found');
				}
			}

			if (req.body.cartId) {
				const cart = await models.Cart.findOne({
					where: { id: Number(req.body.cartId), isDeleted: false }
				});
				if (!cart) {
					return res.status(400).json('Cart not found');
				}
			}

			const cartDetail = await models.CartDetail.findOne({
				where: {
					productId: Number(req.body.productId),
					cartId: req.body.cartId,
					isDeleted: false
				}
			});
			cartDetail.quantity = req.body.quantity;

			if (cartDetail.save()) {
				return res.status(200).json(cartDetail);
			}
			return res.status(400).json('Error');
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async deleteCartDetail(req, res) {
		try {
			const cartDetail = await models.CartDetail.findOne({
				where: {
					productId: Number(req.body.productId),
					cartId: Number(req.body.cartId),
					isDeleted: false
				}
			});
			cartDetail.isDeleted = true;

			if (cartDetail.save()) {
				return res.status(200).json(cartDetail);
			}
			return res.status(400).json('Error');
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}
}

module.exports = new CartDetailController();
