const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const models = require('../models');
const config = require('../config/app');
class AuthController {
	async loginUser(req, res) {
		try {
			const options = {
				where: {
					username: req.body.username,
					roleId: 2
				}
			};
			const user = await models.User.findOne(options);
			if (!user) {
				return res.status(400).json('Tên tài khoản không tồn tại');
			}
			if (user.status === true) {
				let isCorrect = false;
				await bcrypt.compare(req.body.password, user.password).then(result => {
					isCorrect = result;
				});
				if (!isCorrect) {
					return res.status(400).json('Mật khẩu không đúng');
				}
				const payload = _.omit(user.dataValues, [
					'password',
					'createdAt',
					'updatedAt'
				]);
				const token = jwt.sign({ payload }, config.auth.jwt_secret, {
					expiresIn: config.auth.jwt_expires_in,
					algorithm: 'HS512'
				});
				const refreshToken = jwt.sign(
					{ payload },
					config.auth.refresh_token_secret,
					{
						expiresIn: config.auth.refresh_token_expires_in,
						algorithm: 'HS512'
					}
				);
				const dataResponse = {
					token,
					refreshToken
				};
				// tokenList[refreshToken] = dataResponse;
				return res.status(200).json({
					message: 'User logged in successfully',
					...dataResponse
				});
			} else {
				return res.status(400).json('Tài khoản đã bị khóa');
			}
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}

	async loginAdmin(req, res) {
		try {
			const options = {
				where: {
					username: req.body.username,
					roleId: 1
				}
			};
			const user = await models.User.findOne(options);
			if (!user) {
				return res.status(400).json('Tên tài khoản không tồn tại');
			}
			if (user.status === true) {
				let isCorrect = false;
				await bcrypt.compare(req.body.password, user.password).then(result => {
					isCorrect = result;
				});
				if (!isCorrect) {
					return res.status(400).json('Mật khẩu không đúng');
				}
				const payload = _.omit(user.dataValues, [
					'password',
					'createdAt',
					'updatedAt'
				]);
				const token = jwt.sign({ payload }, config.auth.jwt_secret, {
					expiresIn: config.auth.jwt_expires_in,
					algorithm: 'HS512'
				});
				const refreshToken = jwt.sign(
					{ payload },
					config.auth.refresh_token_secret,
					{
						expiresIn: config.auth.refresh_token_expires_in,
						algorithm: 'HS512'
					}
				);
				const dataResponse = {
					token,
					refreshToken
				};
				// tokenList[refreshToken] = dataResponse;
				return res.status(200).json({
					message: 'Admin logged in successfully',
					...dataResponse
				});
			} else {
				return res.status(400).json('Tài khoản đã bị khóa');
			}
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}
}
module.exports = new AuthController();
