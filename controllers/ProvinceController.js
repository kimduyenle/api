const _ = require('lodash');
const models = require('../models');
class ProvinceController {
	async getAllProvinces(req, res) {
		try {
			const provinces = await models.Province.findAll();
			if (!provinces) {
				return res.status(200).json('Province not found');
			}
			const r = provinces.map(province => province._name);
			const data = {};
			data.provinces = r;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async getAllDistricts(req, res) {
		try {
			const provinces = await models.Province.findAll({
				include: [
					{
						model: models.District,
						as: 'districts'
					}
				]
			});
			if (!provinces) {
				return res.status(200).json('Province not found');
			}
			const r = provinces.map(province => {
				const districts = [];
				for (let district of province.districts) {
					districts.push(district._name);
				}
				return {
					[province._name]: districts
				};
			});
			const obj = {};
			for (let re of r) {
				for (let key in re) {
					obj[key] = re[key];
				}
			}
			const data = {};
			data.provinces = obj;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}
}
module.exports = new ProvinceController();
