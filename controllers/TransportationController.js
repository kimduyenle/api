const _ = require('lodash');
const models = require('../models');
class TransportationController {
	async getAllTrans(req, res) {
		try {
			const trans = await models.Transportation.findAll();
			if (!trans) {
				return res.status(200).json('Trans not found');
			}
			const data = {};
			data.trans = trans;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}
}
module.exports = new TransportationController();
