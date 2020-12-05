'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Products', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			userId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'Users',
					key: 'id'
				}
			},
			categoryId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'Categories',
					key: 'id'
				}
			},
			name: {
				type: Sequelize.STRING
			},
			description: {
				type: Sequelize.TEXT
			},
			quantity: {
				type: Sequelize.INTEGER
			},
			price: {
				type: Sequelize.INTEGER
			},
			status: {
				type: Sequelize.BOOLEAN
			},
			sold: {
				type: Sequelize.INTEGER
			},
			isDeleted: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
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
		await queryInterface.dropTable('Products');
	}
};
