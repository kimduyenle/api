'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CartDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        }
      },
      cartId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Carts',
          key: 'id'
        }
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CartDetails');
  }
};