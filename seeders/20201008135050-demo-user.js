"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Users", [
			{
				roleId: 1,
				username: "admin1",
				email: "admin1@example.com",
				password: "admin1",
				status: true,
				phoneNumber: "0123123123",
				address: "DN",
				province: "Hồ Chí Minh",
				district: "Bình Chánh",
				avatar: "https://picsum.photos/200",
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				roleId: 2,
				username: "user1",
				email: "user1@example.com",
				password: "user1",
				status: true,
				phoneNumber: "0123123123",
				address: "DN",
				province: "Hồ Chí Minh",
				district: "Bình Chánh",
				avatar: "https://picsum.photos/200",
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				roleId: 2,
				username: "user2",
				email: "user2@example.com",
				password: "user2",
				status: true,
				phoneNumber: "0123123123",
				address: "DN",
				province: "Hồ Chí Minh",
				district: "Bình Chánh",
				avatar: "https://picsum.photos/200",
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Users", null, {});
	}
};
