'use strict';

const { User } = require('../models');
const { Category } = require('../models');

module.exports = {
	// eslint-disable-next-line no-unused-vars
	up: async (queryInterface, Sequelize) => {
		const users = await User.findAll();
		const categories = await Category.findAll();
		const products = [];
		for (let index = 1; index <= 10; index++) {
			products.push({
				userId:
					users[Math.floor(Math.random() * (users.length - 1 - 0 + 1) + 0)].id,
				categoryId:
					categories[
						Math.floor(Math.random() * (categories.length - 1 - 0 + 1) + 0)
					].id,
				name: `Product ${index}`,
				description: `Description ${index}`,
				quantity: 20,
				price: 20,
				status: true,
				sold: 0,
				createdAt: new Date(),
				updatedAt: new Date()
			});
		}
		return queryInterface.bulkInsert('Products', products, {});
	},
	// up: async (queryInterface, Sequelize) => queryInterface.sequelize.query('SELECT * FROM Users'),
	// eslint-disable-next-line no-unused-vars
	down: (queryInterface, Sequelize) =>
		queryInterface.bulkDelete('Products', null, {})
};
