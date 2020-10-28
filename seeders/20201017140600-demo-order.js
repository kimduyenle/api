'use strict';

const { User } = require('../models')
const { Status } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll();
    const statuses = await Status.findAll();
    const orders = []
    for (let index = 1; index <= 10; index++) {
      orders.push({
        userId:
          users[Math.floor(Math.random() * (users.length - 1 - 0 + 1) + 0)].id,
        statusId:
          statuses[Math.floor(Math.random() * (statuses.length - 1 - 0 + 1) + 0)].id,
        paymentMethod: 'Thanh toan khi nhan hang',
        deliveryPhoneNumber: '0123123123',
        deliveryAddress: 'DN',
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('Orders', orders, {})
  },
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Orders', null, {})
};
