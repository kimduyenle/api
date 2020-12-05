'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class District extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			District.belongsTo(models.Province, {
				foreignKey: '_province_id',
				as: 'province'
			});
		}
	}
	District.init(
		{
			_name: DataTypes.STRING,
			_prefix: DataTypes.STRING,
			_province_id: DataTypes.INTEGER
		},
		{
			sequelize,
			modelName: 'District'
		}
	);
	return District;
};
