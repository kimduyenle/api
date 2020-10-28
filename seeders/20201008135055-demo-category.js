'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'Do Bong',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hop Qua',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Khung Anh',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dong Ho',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Moc Khoa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Buu Thiep',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'San Pham Khac',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {})
  }
};
