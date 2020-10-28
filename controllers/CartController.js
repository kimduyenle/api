const _ = require('lodash');
const models = require('../models');
const paginate = require('../utils/paginate');
const getUserInfo = require('../utils/getUserInfo');
class CartController {
  async getAllCarts(req, res) {
    try {
      const carts = await models.Cart.findAll({
        where: { isDeleted: false },
        include: [
          {
            model: models.User,
            as: 'user',
          },
          {
            model: models.Product,
            as: 'product',
            }
        ],
      });
      if (!carts) {
        return res.status(200).json('Cart not found');
      }
      const data = {};
      data.carts = carts;
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json(error.message)
    }
  }

  async getCartsPerPage(req, res) {
    try {
      const carts = await models.Cart.findAll({
        where: { isDeleted: false },
        include: [
            {
              model: models.User,
              as: 'user',
            },
            {
              model: models.Product,
              as: 'product',
              }
          ],
      });
      if (!carts) {
        return res.status(200).json('Cart not found');
      }
      const atPage = parseInt(req.query.page) || 1;
      const result = paginate(carts, atPage, 6);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error.message)
    }
  }

  async getCartsOfUser(req, res) {
    try {
      const userFromToken = await getUserInfo(req);
      const userId = userFromToken.id;
      const user = await models.User.findOne({ where: { id: userId, isDeleted: false } });
      if (!user) {
        return res.status(400).json('User not found');
      }
      const carts = await models.Cart.findAll({
        where: { userId: userId, isDeleted: false },
        include: [
					{
						model: models.User,
						as: 'user',
					},
					{
						model: models.Product,
						as: 'product',
						}
				],
      });
      if (!carts) {
        return res.status(200).json('Cart not found');
      }
      const data = {};
      data.carts = carts;
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json(error.message)
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

  async getCart(req, res) {
    try {
      const cart = await models.Cart.findOne({
        where: {
          id: Number(req.params.id),
          isDeleted: false,
        },
        include: [
					{
						model: models.User,
						as: 'user',
					},
					{
						model: models.Product,
						as: 'product',
						}
				],
      })
      if (!cart) {
        return res.status(200).json('Cart not found');
      }
			const data = {};
			cart.dataValues.user = cart.user.username;
			// orderDetail.dataValues.order = orderDetail.order.id;
      data.cart = cart;
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async createCart(req, res) {
    try {
			const userFromToken = await getUserInfo(req);
      const userId = userFromToken.id;
      const user = await models.User.findOne({ where: { id: userId, isDeleted: false } });
      if (!user) {
        return res.status(400).json('User not found');
      }
      const product = await models.Product.findOne({
        where: { id: Number(req.body.productId), isDeleted: false }
      });
      if (!product) {
        return res.status(400).json('Product not found');
      }

      const data = req.body;
			data.userId = userId;
      const newCart = await models.Cart.create(data);
      if (!newCart) {
        return res.status(400).json('Error');
      }
      return res.status(201).json(newCart);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async updateCartQuantity(req, res) {
    try {
      // get userId trong token
      const userFromToken = await getUserInfo(req);
      const userId = userFromToken.id;
      const user = await models.User.findOne({ where: { id: userId, isDeleted: false } });
      if (!user) {
        return res.status(400).json('User not found');
      }
      
      const product = await models.Cart.findOne({
        where: {
					userId: userId,
					productId: Number(req.params.productId),
					isDeleted: false,
        },
        include: [
					{
						model: models.User,
						as: 'user',
					},
					{
						model: models.Product,
						as: 'product',
						}
				],
      });
      product.quantity = req.body.quantity;

      if (product.save()) {
        return res.status(200).json(product);        
      }
      return res.status(400).json('Error');
    } catch (error) {
      return res.status(400).json(error.message);
    }
	}
	
	async deleteCart(req, res) {
    try {
			const userFromToken = await getUserInfo(req);
      const userId = userFromToken.id;
      const user = await models.User.findOne({ where: { id: userId, isDeleted: false } });
      if (!user) {
        return res.status(400).json('User not found');
      }
      const product = await models.Cart.findOne({
        where: {
					userId: userId,
          productId: Number(req.params.productId),
        },
      });
      product.isDeleted = true;

      if (product.save()) {
        return res.status(200).json(product);        
      }
      return res.status(400).json('Error');
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

module.exports = new CartController()