const _ = require('lodash')
const models = require('../models')
class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await models.User.findAll()
      if (!users) {
        return res.status(200).json('Not found')
      }
      const data = {}
      data.users = users
      return res.status(200).json(data)
    } catch (error) {
      return res.status(400).json(error.message)
    }
  }
}
module.exports = new UserController()
