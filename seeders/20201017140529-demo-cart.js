'use strict';

const { User } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll();
    const carts = []
    for (let index = 1; index <= 10; index++) {
      carts.push({
        userId:
          users[Math.floor(Math.random() * (users.length - 1 - 0 + 1) + 0)].id,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('Carts', carts, {})
  },
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Carts', null, {})
};
