const _ = require("lodash");
const models = require("../models");
const paginate = require("../utils/paginate");
const getUserInfo = require("../utils/getUserInfo");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
class ReviewController {
	async getAllReviews(req, res) {
		try {
			const reviews = await models.Review.findAll({
				where: { isDeleted: false },
				include: [
					{
						model: models.User,
						as: "user"
					},
					{
						model: models.Product,
						as: "product"
					}
				]
			});
			if (!reviews) {
				return res.status(200).json("Review not found");
			}
			const data = {};
			data.reviews = reviews;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async getReviewsPerPage(req, res) {
		try {
			let search = req.query.search || "";
			search = search.toLowerCase();
			const reviews = await models.Review.findAll({
				where: {
					isDeleted: false,
					[Op.or]: [
						{
							"$product.name$": {
								[Op.like]: `%${search}%`
							}
						},
						{
							"$user.username$": {
								[Op.like]: `%${search}%`
							}
						},
						{
							content: {
								[Op.like]: `%${search}%`
							}
						},
						{
							star: {
								[Op.like]: `%${search}%`
							}
						}
					]
				},
				order: [["createdAt", "DESC"]],
				include: [
					{
						model: models.User,
						as: "user"
					},
					{
						model: models.Product,
						as: "product"
					}
				]
			});
			if (!reviews) {
				return res.status(200).json("Review not found");
			}
			const atPage = parseInt(req.query.page) || 1;
			const limit = parseInt(req.query.limit) || 10;
			const result = paginate(reviews, atPage, limit);
			return res.status(200).json(result);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async getReviewsOfProduct(req, res) {
		try {
			const productId = Number(req.params.productId);
			const product = await models.Product.findOne({
				where: { id: productId, isDeleted: false }
			});
			if (!product) {
				return res.status(200).json("Product not found");
			}
			const reviews = await models.Review.findAll({
				where: { productId: productId, isDeleted: false },
				include: [
					{
						model: models.User,
						as: "user"
					},
					{
						model: models.Product,
						as: "product"
					}
				]
			});
			if (!reviews) {
				return res.status(200).json("Review not found");
			}
			const data = {};
			data.reviews = reviews;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async getReview(req, res) {
		try {
			const review = await models.Review.findOne({
				where: {
					id: Number(req.params.id),
					isDeleted: false
				},
				include: [
					{
						model: models.User,
						as: "user"
					},
					{
						model: models.Product,
						as: "product"
					}
				]
			});
			if (!review) {
				return res.status(200).json("Review not found");
			}
			const data = {};
			// review.dataValues.user = review.user.username;
			// review.dataValues.product = review.product.name;
			data.review = review;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async createReview(req, res) {
		try {
			const userFromToken = await getUserInfo(req);
			const userId = userFromToken.id;
			const user = await models.User.findOne({
				where: { id: userId, isDeleted: false }
			});
			if (!user) {
				return res.status(400).json("User not found");
			}
			const product = await models.Product.findOne({
				where: { id: Number(req.body.productId), isDeleted: false }
			});
			if (!product) {
				return res.status(400).json("Product not found");
			}

			const data = req.body;
			data.userId = userId;

			const newReview = await models.Review.create(data);
			if (!newReview) {
				return res.status(400).json("Error");
			}
			return res.status(201).json(newReview);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	// async updateProduct(req, res) {
	//   try {
	//     // get userId trong token
	//     const userFromToken = await getUserInfo(req);
	//     const userId = userFromToken.id;
	//     const user = await models.User.findOne({ where: { id: userId, isDeleted: false } });
	//     if (!user) {
	//       return res.status(400).json('User not found');
	//     }
	//     if (req.body.categoryId) {
	//       const category = await models.Category.findOne({
	//         where: { id: Number(req.body.categoryId), isDeleted: false  }
	//       });
	//       if (!category) {
	//         return res.status(400).json('Category not found');
	//       }
	//     }

	//     const product = await models.Product.findOne({
	//       where: {
	//         id: Number(req.params.id),
	//         isDeleted: false
	//       },
	//       include: [
	//         {
	//           model: models.User,
	//           as: 'user',
	//         },
	//         {
	//           model: models.Category,
	//           as: 'category',
	// 				}
	// 			],
	//     });

	//     if(userId !== product.userId) {
	//       return res.status(401).json('No permission');
	//     }
	//     product.categoryId = req.body.categoryId;
	//     product.name = req.body.name;
	//     product.description = req.body.description;
	//     product.quantity = req.body.quantity;
	//     product.price = req.body.price;
	//     product.status = req.body.status;

	//     if (product.save()) {
	//       return res.status(200).json(product);
	//     }
	//     return res.status(400).json('Error');
	//   } catch (error) {
	//     return res.status(400).json(error.message);
	//   }
	// }

	async deleteReview(req, res) {
		try {
			const review = await models.Review.findOne({
				where: {
					id: Number(req.params.id),
					isDeleted: false
				}
			});
			review.isDeleted = true;

			if (review.save()) {
				return res.status(200).json(review);
			}
			return res.status(400).json("Error");
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}
}

module.exports = new ReviewController();
