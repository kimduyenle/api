'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Transportation', [
			{
				name: 'Giao hàng tiêu chuẩn',
				cost: 1,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Giao hàng nhanh',
				cost: 3,
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Transportation', null, {});
	}
};
