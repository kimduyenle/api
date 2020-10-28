const jwt = require('jsonwebtoken');
const models = require('../models');
const auth = require('../utils/auth');

const getUserInfo = async (req, res) => {
	try {
		const tokenFromHeader = auth.getJwtToken(req);
		const account = jwt.decode(tokenFromHeader);
		const user = await models.User.findOne({
			where: {
				id: account.payload.id
			},
			include: [{
				model: models.Role,
				as: 'role',
			}],
		});

		if (!user) {
			console.log('User not found');
		}
		// const data = {};
		// user.dataValues.role = user.role.name;
		// data.user = user;
		return user;

	} catch (error) {
		console.log(error.message);
	}
}

module.exports = getUserInfo;