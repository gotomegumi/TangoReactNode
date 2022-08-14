'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Word1 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Word1.init({
    korean: DataTypes.STRING,
    meaning: DataTypes.STRING,
    pronounce: DataTypes.STRING,
    section: DataTypes.STRING,
    learning: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'word1',
    createdAt: false,
    updatedAt: false,

  });
  return Word1;
};