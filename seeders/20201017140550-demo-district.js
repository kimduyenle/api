'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Districts', [
			{
				_name: 'Bình Chánh',
				_prefix: 'Huyện',
				_province_id: 1,
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Districts', null, {});
	}
};
