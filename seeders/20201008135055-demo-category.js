'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Categories', [
			{
				name: 'Do Bong',
				image: 'https://picsum.photos/300',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Hop Qua',
				image: 'https://picsum.photos/300',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Khung Anh',
				image: 'https://picsum.photos/300',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Dong Ho',
				image: 'https://picsum.photos/300',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Moc Khoa',
				image: 'https://picsum.photos/300',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Buu Thiep',
				image: 'https://picsum.photos/300',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'San Pham Khac',
				image: 'https://picsum.photos/300',
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Categories', null, {});
	}
};
