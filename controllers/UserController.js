const _ = require('lodash')
const jwt = require('jsonwebtoken');
const models = require('../models')
const bcrypt = require('bcrypt');
const config = require('../config/app');
const auth = require('../utils/auth');
class UserController {
  async getProfile(req, res) {
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
      })

      if (!user) {
        return res.status(200).json('User not found');
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
        include: [{
          model: models.Role,
          as: 'role',
        }],
      })
      if (!users) {
        return res.status(200).json('User not found')
      }
      const data = {}
      data.users = users
      return res.status(200).json(data)
    } catch (error) {
      return res.status(400).json(error.message)
    }
  }

  async getUser(req, res) {
    try {
      const user = await models.User.findOne({
        where: {
          id: Number(req.params.id),
        },
        include: [{
          model: models.Role,
          as: 'role',
        }],
      })
      if (!user) {
        return res.status(200).json('User not found');
      }
      const data = {};
      user.dataValues.role = user.role.name;
      data.user = user;
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async createUser(req, res) {
    try {
      // check user email exist
      const user = await models.User.findOne({
        where: {
          username: req.body.username
        }
      });
      if (user) {
        return res.status(400).json('Username exists')
      }

      const data = req.body;
      data.roleId = 2;
      data.password = bcrypt.hashSync(data.password, config.auth.saltRounds);
      data.status = true;

      const newUser = await models.User.create(data);
      if (!newUser) {
        return res.status(400).json('Error');
      }
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async updateUser(req, res) {
    try {
      const user = await models.User.findOne({
        where: {
          id: Number(req.params.id),
        },
      });
      user.username = req.body.username;
      user.email = req.body.email;
      user.phoneNumber = req.body.phoneNumber;
      user.address = req.body.address;
      // const user = await models.User.update(req.body, {
      //   where: {
      //     id: req.params.id,
      //   }
      // });
      if (user.save()) {
        return res.status(200).json(user);        
      }
      return res.status(400).json('Error');
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async updateUserPassword(req, res) {
    try {
      const user = await models.User.findOne({
        where: {
          id: Number(req.params.id),
        },
      });
      user.password = bcrypt.hashSync(req.body.password, config.auth.saltRounds);
      if (user.save()) {
        return res.status(200).json(user);
      }
      return res.status(400).json('Error');
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async updateUserStatus(req, res) {
    try {
      const user = await models.User.findOne({
        where: {
          id: Number(req.params.id),
        },
      });
      user.status = req.body.status;
      if (user.save()) {
        return res.status(200).json(user);
      }
      return res.status(400).json('Error');
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async deleteUser(req, res) {
    try {
      const user = await models.User.findOne({
        where: {
          id: Number(req.params.id),
        },
      });
      user.isDeleted = true;

      if (user.save()) {
        return res.status(200).json(user);        
      }
      return res.status(400).json('Error');
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}
module.exports = new UserController()
