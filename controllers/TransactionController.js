const _ = require("lodash");
const models = require("../models");
const getUserInfo = require("../utils/getUserInfo");
class TransactionController {
	async getAllTransaction(req, res) {
		try {
			const transactions = await models.Transaction.findAll();
			if (!transactions) {
				return res.status(200).json("Transaction not found");
			}
			const data = {};
			data.transactions = transactions;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async createTransaction(req, res) {
		try {
			const userId = Number(req.body.userId);
			const user = await models.User.findOne({
				where: { id: userId, isDeleted: false }
			});
			if (!user) {
				return res.status(400).json("User not found");
			}

			const orderId = Number(req.body.orderId);
			const order = await models.Order.findOne({
				where: { id: orderId, isDeleted: false }
			});
			if (!order) {
				return res.status(400).json("Order not found");
			}

			const data = req.body;

			const newTransaction = await models.Transaction.create(data);
			if (!newTransaction) {
				return res.status(400).json("Error");
			}
			user.wallet += req.body.amount;
			user.save();
			return res.status(201).json(newTransaction);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}
}
module.exports = new TransactionController();
