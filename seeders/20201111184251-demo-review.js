'use strict';

const { Product } = require('../models')
const { User } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = await Product.findAll();
    const users = await User.findAll();
    const reviews = [];
    for (let index = 1; index <= 20; index++) {
      reviews.push({
        productId:
          products[Math.floor(Math.random() * (products.length - 1 - 0 + 1) + 0)].id,
        userId:
          users[Math.floor(Math.random() * (users.length - 1 - 0 + 1) + 0)].id,
        content: 'Giao hang nhanh',
        star: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('Reviews', reviews, {})
  },
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Reviews', null, {})
};
