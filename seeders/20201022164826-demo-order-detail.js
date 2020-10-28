'use strict';

const { Product } = require('../models')
const { Order } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = await Product.findAll();
    const orders = await Order.findAll();
    const orderDetails = [];
    for (let index = 1; index <= 30; index++) {
      orderDetails.push({
        productId:
          products[Math.floor(Math.random() * (products.length - 1 - 0 + 1) + 0)].id,
        orderId:
          orders[Math.floor(Math.random() * (orders.length - 1 - 0 + 1) + 0)].id,
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('OrderDetails', orderDetails, {})
  },
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('OrderDetails', null, {})
};
