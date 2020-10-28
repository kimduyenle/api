'use strict';

const { Product } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = await Product.findAll();
    const images = []
    for (let index = 1; index <= 20; index++) {
      images.push({
        productId:
          products[Math.floor(Math.random() * (products.length - 1 - 0 + 1) + 0)].id,
        path: 'https://picsum.photos/300',
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('Images', images, {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {})
  }
};
