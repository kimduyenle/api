'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Statuses', [
      {
        name: 'Cho xac nhan',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cho lay hang',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Statuses', null, {})
  }
};
