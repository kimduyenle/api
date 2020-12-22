const _ = require("lodash");
const models = require("../models");
const paginate = require("../utils/paginate");
const getUserInfo = require("../utils/getUserInfo");
const paypal = require("@paypal/payouts-sdk");
const nodeXlsx = require("node-xlsx");
const calTotal = require("../utils/calTotal");
const formatDate = require("../utils/formatDate");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
class StatisticsController {
	async export(req, res) {
		try {
			let title = [
				"Mã đơn hàng",
				"Chủ cửa hàng",
				"Khách hàng",
				"Ngày giao hàng",
				"Tiền hàng",
				"Phí vận chuyển",
				"Tổng"
			];
			let orders = await models.Order.findAll({
				where: { statusId: { [Op.or]: [4, 10] }, isDeleted: false },
				order: [["createdAt", "DESC"]],
				include: [
					{
						model: models.User,
						as: "user"
					},
					{
						model: models.Status,
						as: "status"
					},
					{
						model: models.Transportation,
						as: "transportation"
					},
					{
						model: models.OrderDetail,
						as: "orderDetails",
						include: [
							{
								model: models.Product,
								as: "product",
								where: { isDeleted: false },
								include: [
									{
										model: models.User,
										as: "user"
									},
									{
										model: models.Image,
										as: "images"
									}
								]
							}
						]
					},
					{
						model: models.OrderHistory,
						as: "orderHistories"
					}
				]
			});

			const startDate = req.query.startDate;
			const endDate = req.query.endDate;

			if (startDate && endDate) {
				orders = orders.filter(order => {
					const dd = ("0" + order.updatedAt.getDate()).slice(-2);
					const mm = ("0" + (order.updatedAt.getMonth() + 1)).slice(-2);
					const yyyy = order.updatedAt.getFullYear();
					const d = `${yyyy}-${mm}-${dd}`;
					if (
						new Date(d).getTime() >= new Date(startDate).getTime() &&
						new Date(d).getTime() <= new Date(endDate).getTime()
					) {
						return true;
					}
					return false;
				});
			}

			const price = orders
				.map(({ orderDetails }) => calTotal(orderDetails))
				.reduce((sum, i) => sum + i, 0);
			const shipCost = orders
				.map(({ transportation }) => transportation.cost)
				.reduce((sum, i) => sum + i, 0);
			const revenue = price + shipCost;
			const result = orders.map(item => {
				return [
					item.id,
					item.orderDetails[0].product.user.username,
					item.user.username,
					formatDate(item.updatedAt),
					`$${calTotal(item.orderDetails)}`,
					`$${item.transportation.cost}`,
					`$${calTotal(item.orderDetails) + item.transportation.cost}`
				];
			});
			result.unshift(title);
			result.push(["", "", "", "", "Tổng doanh thu", "", `$${revenue}`]);
			let buffer = nodeXlsx.build([{ name: "List User", data: result }]); // Returns a buffer
			res.attachment("report.xlsx");
			res.send(buffer);
		} catch (error) {
			return res.status(400).json(error.message);
		}
		// let dataExcel = [];
		// User.find({})
		//   .then(users => {
		//     // Lay du lieu header cho file excel <=> lay cac key name trong collection
		//     // O day cac key name cua collection user la: userName, email, phone
		//     let arrHeaderTitle = [];
		//     Object.keys(users[0]['_doc']).forEach(key => {
		//       arrHeaderTitle.push(key);
		//     });
		//     dataExcel.push(arrHeaderTitle);  // push header vao mang dataExcel

		//     // Lay du lieu cac row tuong ung voi header <=> lay cac value tuong ung voi key name o tren
		//     for (let item of users) {
		//       let rowItemValue = [];
		//       Object.keys(item._doc).forEach(key => {
		//         rowItemValue.push(item[key]);
		//       });
		//       dataExcel.push(rowItemValue); // push tung dong value vao mang dataExcel
		//     }
		//     let buffer = nodeXlsx.build([{name: "List User", data: dataExcel}]); // Returns a buffer
		//     res.attachment('users.xlsx');
		//     res.send(buffer);
		//   })
		//   .catch(err => res.status(400).json(err));
	}

	async statistics(req, res) {
		try {
			const products = await models.Product.findAll({
				where: { isDeleted: false }
			});
			const users = await models.User.findAll({
				where: { isDeleted: false }
			});
			const orders = await models.Order.findAll({
				where: { isDeleted: false }
			});
			const completedOrders = await models.Order.findAll({
				where: {
					isDeleted: false,
					statusId: {
						[Op.or]: [4, 10]
					}
				}
			});
			return res.status(200).json({
				products: products.length,
				users: users.length,
				orders: orders.length,
				completedOrders: completedOrders.length
			});
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}
}

module.exports = new StatisticsController();
