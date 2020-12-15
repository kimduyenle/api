"use strict";

const { Order } = require("../models");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const orders = await Order.findAll();
		const orderHistories = [];
		for (let index = 1; index <= 5; index++) {
			orderHistories.push({
				orderId:
					orders[Math.floor(Math.random() * (orders.length - 1 - 0 + 1) + 0)]
						.id,
				name: "Da roi kho",
				createdAt: new Date(),
				updatedAt: new Date()
			});
		}
		return queryInterface.bulkInsert("OrderHistories", orderHistories, {});
	},
	down: (queryInterface, Sequelize) =>
		queryInterface.bulkDelete("OrderHistories", null, {})
};
