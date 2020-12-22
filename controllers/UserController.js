const _ = require("lodash");
const jwt = require("jsonwebtoken");
const models = require("../models");
const bcrypt = require("bcrypt");
const config = require("../config/app");
const auth = require("../utils/auth");
const { bucket } = require("../utils/uploadImage");
const paginate = require("../utils/paginate");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
class UserController {
	async getProfile(req, res) {
		try {
			const tokenFromHeader = auth.getJwtToken(req);
			const account = jwt.decode(tokenFromHeader);
			const user = await models.User.findOne({
				where: {
					id: account.payload.id,
					isDeleted: false
				},
				include: [
					{
						model: models.Role,
						as: "role"
					},
					{
						model: models.Product,
						as: "products",
						where: { isDeleted: false },
						required: false,
						include: [
							{
								model: models.Image,
								as: "images"
							},
							{
								model: models.OrderDetail,
								as: "orderDetails",
								where: { isDeleted: false },
								required: false
							}
						]
					},
					{
						model: models.Cart,
						as: "cart",
						include: [
							{
								model: models.CartDetail,
								as: "cartDetails",
								where: { isDeleted: false }
							}
						]
					},
					{
						model: models.Transaction,
						as: "transactions"
					}
				]
			});

			if (!user) {
				return res.status(200).json("User not found");
			}
			const data = {};
			user.dataValues.role = user.role.name;
			data.user = user;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async getAllUsers(req, res) {
		try {
			const users = await models.User.findAll({
				where: { isDeleted: false },
				include: [
					{
						model: models.Role,
						as: "role"
					}
				]
			});
			if (!users) {
				return res.status(200).json("User not found");
			}
			const data = {};
			data.users = users;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async getUsersPerPage(req, res) {
		try {
			let search = req.query.search || "";
			search = search.toLowerCase();
			const users = await models.User.findAll({
				where: {
					isDeleted: false,
					[Op.or]: [
						{
							username: Sequelize.where(
								Sequelize.fn("LOWER", Sequelize.col("username")),
								"LIKE",
								"%" + search + "%"
							)
						},
						{
							email: Sequelize.where(
								Sequelize.fn("LOWER", Sequelize.col("email")),
								"LIKE",
								"%" + search + "%"
							)
						},
						{
							"$role.name$": {
								[Op.like]: `%${search}%`
							}
						}
						// {
						// 	createdAt: Sequelize.where(
						// 		Sequelize.fn(
						// 			"date_format",
						// 			Sequelize.col("createdAt"),
						// 			"%Y-%m-%d"
						// 		),
						// 		"LIKE",
						// 		"%" + search + "%"
						// 	)
						// }
					]
				},
				order: [["createdAt", "DESC"]],
				include: [
					{
						model: models.Role,
						as: "role",
						attributes: ["name"]
					}
				]
			});
			if (!users) {
				return res.status(200).json("User not found");
			}
			const atPage = parseInt(req.query.page) || 1;
			const limit = parseInt(req.query.limit) || 10;
			const result = paginate(users, atPage, limit);
			return res.status(200).json(result);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async getUser(req, res) {
		try {
			const user = await models.User.findOne({
				where: {
					id: Number(req.params.id),
					isDeleted: false
				},
				include: [
					{
						model: models.Role,
						as: "role"
					},
					{
						model: models.Product,
						as: "products",
						where: { isDeleted: false },
						required: false
					},
					{
						model: models.Cart,
						as: "cart",
						include: [
							{
								model: models.CartDetail,
								as: "cartDetails",
								where: { isDeleted: false }
							}
						]
					}
				]
			});
			if (!user) {
				return res.status(200).json("User not found");
			}
			const data = {};
			user.dataValues.role = user.role.name;
			data.user = user;
			return res.status(200).json(data);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async createUser(req, res, next) {
		try {
			// check user email exist
			const username = await models.User.findOne({
				where: {
					username: req.body.username,
					isDeleted: false
				}
			});
			if (username) {
				return res.status(400).json("Tên tài khoản đã tồn tại");
			}

			const email = await models.User.findOne({
				where: {
					email: req.body.email
				}
			});
			if (email) {
				return res.status(400).json("Email đã tồn tại");
			}

			const data = req.body;
			if (!req.body.roleId) {
				data.roleId = 2;
			}
			data.password = bcrypt.hashSync(data.password, config.auth.saltRounds);
			data.status = true;
			data.avatar =
				"https://firebasestorage.googleapis.com/v0/b/my-shop-da89c.appspot.com/o/default-avatar.jpg?alt=media";
			data.wallet = 0;

			const newUser = await models.User.create(data);
			if (!newUser) {
				return res.status(400).json("Error");
			}
			req.body.userId = newUser.dataValues.id;
			next();
			return res.status(201).json(newUser);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async uploadAvatar(req, res, next) {
		try {
			if (!req.file) {
				res.status(400).json("Error, could not upload file");
				return;
			}

			const user = await models.User.findOne({
				where: { id: Number(req.params.id), isDeleted: false }
			});
			if (!user) {
				return res.status(400).json("User not found");
			}

			// Create new blob in the bucket referencing the file
			const blob = bucket.file(req.file.originalname);

			// Create writable stream and specifying file mimetype
			const blobWriter = blob.createWriteStream({
				metadata: {
					contentType: req.file.mimetype
				}
			});

			blobWriter.on("error", err => next(err));

			blobWriter.on("finish", async () => {
				// Assembling public URL for accessing the file via HTTP
				const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
					bucket.name
				}/o/${encodeURI(blob.name)}?alt=media`;

				user.avatar = publicUrl;
				if (user.save()) {
					return res.status(200).json(user);
				}
				return res.status(400).json("Error");

				// Return the file name and its public URL
				//   res
				//     .status(200)
				//     .json({ fileName: req.file.originalname, fileLocation: publicUrl });
			});

			// When there is no more data to be consumed from the stream
			blobWriter.end(req.file.buffer);
		} catch (error) {
			res.status(400).json(`Error, could not upload file: ${error}`);
			return;
		}
	}

	async updateUser(req, res) {
		try {
			const user = await models.User.findOne({
				where: {
					id: Number(req.params.id),
					isDeleted: false
				}
			});
			user.username = req.body.username;
			user.email = req.body.email;
			user.phoneNumber = req.body.phoneNumber;
			user.address = req.body.address;
			user.province = req.body.province;
			user.district = req.body.district;
			user.wallet = req.body.wallet;
			// const user = await models.User.update(req.body, {
			//   where: {
			//     id: req.params.id,
			//   }
			// });
			if (user.save()) {
				return res.status(200).json(user);
			}
			return res.status(400).json("Error");
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async updateUserPassword(req, res) {
		try {
			const user = await models.User.findOne({
				where: {
					id: Number(req.params.id),
					isDeleted: false
				}
			});
			let isCorrect = false;
			await bcrypt.compare(req.body.oldPassword, user.password).then(result => {
				isCorrect = result;
			});
			if (!isCorrect) {
				return res.status(400).json("Mật khẩu cũ không đúng");
			}
			if (req.body.newPassword !== req.body.confirmPassword) {
				return res.status(400).json("Xác nhận mật khẩu không đúng");
			}
			user.password = bcrypt.hashSync(
				req.body.newPassword,
				config.auth.saltRounds
			);
			if (user.save()) {
				return res.status(200).json(user);
			}
			return res.status(400).json("Error");
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async updateUserStatus(req, res) {
		try {
			const user = await models.User.findOne({
				where: {
					id: Number(req.params.id),
					isDeleted: false
				}
			});
			user.status = req.body.status;
			if (user.save()) {
				return res.status(200).json(user);
			}
			return res.status(400).json("Error");
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async deleteUser(req, res) {
		try {
			const user = await models.User.findOne({
				where: {
					id: Number(req.params.id),
					isDeleted: false
				}
			});
			user.isDeleted = true;

			const products = await models.Product.findAll({
				where: {
					userId: Number(req.params.id)
				}
			});

			for (let i of products) {
				i.isDeleted = true;
				i.save();
			}

			if (user.save()) {
				return res.status(200).json(user);
			}
			return res.status(400).json("Error");
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}
}
module.exports = new UserController();
