"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("OrderHistories", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			orderId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: "Orders",
					key: "id"
				}
			},
			name: {
				type: Sequelize.STRING
			},
			note: {
				type: Sequelize.STRING
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
		await queryInterface.dropTable("OrderHistories");
	}
};
