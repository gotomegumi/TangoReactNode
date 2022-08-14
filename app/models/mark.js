'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  mark.init({
    section: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'mark',
    tableName: 'mark',
    createdAt: false,
    updatedAt: false,
  });
  return mark;
};