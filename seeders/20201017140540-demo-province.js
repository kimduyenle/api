'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Provinces', [
			{
				_name: 'Hồ Chí Minh',
				_code: 'SG',
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Provinces', null, {});
	}
};
