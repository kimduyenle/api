'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role' // object gom cac truong ben bang role
      })
      User.hasMany(models.Order, {
        foreignKey: 'userId',
        as: 'orders' //
      })
    }
  }
  User.init(
    {
      roleId: DataTypes.INTEGER,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
      avatar: DataTypes.STRING,
      isDeleted: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'User'
    }
  )
  return User
}
