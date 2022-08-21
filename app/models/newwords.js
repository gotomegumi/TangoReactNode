'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class newWords extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  newWords.init({
    korean: DataTypes.STRING,
    meaning: DataTypes.STRING,
    pronounce: DataTypes.STRING,
    section: DataTypes.STRING,
    learning: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'newWords',
    tableName: 'newWords',
    createdAt: false,
    updatedAt: false,
  });
  return newWords;
};