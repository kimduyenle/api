const jwt = require('jsonwebtoken');
const _ = require('lodash');
const config = require('../config/app');
// const RequestHandler = require('./RequestHandler');
// const Logger = require('./logger');
// const constants = require('./constants');
// const BaseController = require('../controllers/BaseController');

function getTokenFromHeader(req) {
	if ((req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token')
		|| (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
		return req.headers.authorization.split(' ')[1];
	}
	return null;
}

function isAuthenticated(req, res, next) {
	try {
		if (_.isUndefined(req.headers.authorization)) {
            // requestHandler.throwError(401, 'Not Authorized to access this resource!')();
            return res.status(401).json('Not Authorized to access this resource!');
		}
		const Bearer = req.headers.authorization.split(' ')[0];

		if (!Bearer || Bearer !== 'Bearer') {
            // requestHandler.throwError(401, 'Not Authorized to access this resource!')();
            return res.status(401).json('Not Authorized to access this resource!')
		}

		const token = req.headers.authorization.split(' ')[1];

		if (!token) {
            // requestHandler.throwError(401, 'Not Authorized to access this resource!')();
            return res.status(401).json('Not Authorized to access this resource!')
		}

		jwt.verify(token, config.auth.jwt_secret, (err, decoded) => {
			if (err) {
                // requestHandler.throwError(401, 'Please provide a valid token, your token might be expired')();
                return res.status(401).json('Please provide a valid token, your token might be expired');
			}
			req.decoded = decoded;
			next();
		});
	} catch (error) {
        // requestHandler.sendFailure(res, 40001, error.message)();
        return res.status(401).json(error.message);
	}
}

function isAdmin(req, res, next) {
	try {
		const tokenFromHeader = getTokenFromHeader(req);
		const account = jwt.decode(tokenFromHeader);
		if (account.payload.roleId === 1) {
			next();
		} else {
            // requestHandler.throwError(401, 'No permission')();
            return res.status(401).json('No permission');
		}
	} catch (error) {
        // requestHandler.sendFailure(res, 40001, error.message)();
        return res.status(401).json(error.message);
	}
}

function getAccountFromToken(req, res) {
	try {
		const tokenFromHeader = getTokenFromHeader(req);
		const account = jwt.decode(tokenFromHeader);
		return account.payload;
	} catch (error) {
        // return requestHandler.sendFailure(res, 40001, error.message)();
        return res.status(401).json(error.message);
	}
}

module.exports = {
	getJwtToken: getTokenFromHeader, isAuthenticated, isAdmin
};