const _ = require('lodash');
const models = require('../models');
class RoleController {
	async getAllRoles(req, res) {
		try {
			const roles = await models.Role.findAll();
			if (!roles) {
				return res.status(200).json('Role not found');
			}
			const data = {};
			data.roles = roles;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async getRole(req, res) {
		try {
			const role = await models.Role.findOne({
				where: {
					id: Number(req.params.id)
				}
			});
			if (!role) {
				return res.status(200).json('Role not found');
			}
			const data = {};
			data.role = role;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}
}
module.exports = new RoleController();
