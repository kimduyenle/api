'use strict';

const { Product } = require('../models')
const { Cart } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = await Product.findAll();
    const carts = await Cart.findAll();
    const cartDetails = [];
    for (let index = 1; index <= 3; index++) {
      cartDetails.push({
        productId:
          products[Math.floor(Math.random() * (products.length - 1 - 0 + 1) + 0)].id,
        cartId:
          carts[Math.floor(Math.random() * (carts.length - 1 - 0 + 1) + 0)].id,
        quantity: 2,
        price: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('CartDetails', cartDetails, {})
  },
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('CartDetails', null, {})
};
