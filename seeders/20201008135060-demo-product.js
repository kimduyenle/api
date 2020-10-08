'use strict'

const { User } = require('../models')

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll()
    const products = []
    for (let index = 0; index < 100; index++) {
      products.push({
        userId:
          users[Math.floor(Math.random() * (users.length - 1 - 0 + 1) + 0)].id,
        name: 'Product 1',
        description: 'Description 1',
        quantity: 20,
        price: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('Products', products, {})
  },
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Products', null, {})
}
