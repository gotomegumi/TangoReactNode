'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class progress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  progress.init({
    answerrate: DataTypes.STRING,
    answered: DataTypes.STRING,
    section: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'progress',
    tableName: 'progress',
    createdAt: false,
    updatedAt: false,
  });
  return progress;
};