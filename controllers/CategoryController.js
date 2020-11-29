const _ = require('lodash');
const models = require('../models');
class CategoryController {
	async getAllCategories(req, res) {
		try {
			const categories = await models.Category.findAll({
				where: { isDeleted: false }
			});
			if (!categories) {
				return res.status(200).json('Category not found');
			}
			const data = {};
			data.categories = categories;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async getCategory(req, res) {
		try {
			const category = await models.Category.findOne({
				where: {
					id: Number(req.params.id),
					isDeleted: false
				}
			});
			if (!category) {
				return res.status(200).json('Category not found');
			}
			const data = {};
			data.category = category;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async createCategory(req, res) {
		try {
			const newCategory = await models.Category.create(req.body);
			if (!newCategory) {
				return res.status(400).json('Error');
			}
			return res.status(201).json(newCategory);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async updateCategory(req, res) {
		try {
			const category = await models.Category.findOne({
				where: {
					id: Number(req.params.id),
					isDeleted: false
				}
			});
			category.name = req.body.name;

			if (category.save()) {
				return res.status(200).json(category);
			}
			return res.status(400).json('Error');
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async deleteCategory(req, res) {
		try {
			const category = await models.Category.findOne({
				where: {
					id: Number(req.params.id),
					isDeleted: false
				}
			});
			category.isDeleted = true;

			if (category.save()) {
				return res.status(200).json(category);
			}
			return res.status(400).json('Error');
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}
}
module.exports = new CategoryController();
