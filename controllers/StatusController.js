const _ = require('lodash');
const models = require('../models');
class StatusController {
	async getAllStatuses(req, res) {
		try {
			const statuses = await models.Status.findAll({
				where: { isDeleted: false }
			});
			if (!statuses) {
				return res.status(200).json('Status not found');
			}
			const data = {};
			data.statuses = statuses;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async getStatus(req, res) {
		try {
			const status = await models.Status.findOne({
				where: {
					id: Number(req.params.id),
					isDeleted: false
				}
			});
			if (!status) {
				return res.status(200).json('Status not found');
			}
			const data = {};
			data.status = status;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async createStatus(req, res) {
		try {
			const newStatus = await models.Status.create(req.body);
			if (!newStatus) {
				return res.status(400).json('Error');
			}
			return res.status(201).json(newStatus);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async updateStatus(req, res) {
		try {
			const status = await models.Status.findOne({
				where: {
					id: Number(req.params.id),
					isDeleted: false
				}
			});
			status.name = req.body.name;
			if (status.save()) {
				return res.status(200).json(status);
			}
			return res.status(400).json('Error');
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async deleteStatus(req, res) {
		try {
			const status = await models.Status.findOne({
				where: {
					id: Number(req.params.id),
					isDeleted: false
				}
			});
			status.isDeleted = true;

			if (status.save()) {
				return res.status(200).json(status);
			}
			return res.status(400).json('Error');
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}
}
module.exports = new StatusController();
