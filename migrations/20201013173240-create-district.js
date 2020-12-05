'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Districts', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			_name: {
				type: Sequelize.STRING
			},
			_prefix: {
				type: Sequelize.STRING
			},
			_province_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'Provinces',
					key: 'id'
				}
			},
			createdAt: {
				allowNull: true,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: true,
				type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Districts');
	}
};
