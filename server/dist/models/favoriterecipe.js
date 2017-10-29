'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var favoriterecipe = sequelize.define('favoriterecipe', {
    recipeID: {
      type: DataTypes.INTEGER,
      allownull: false,
      unique: true
    },
    category: {
      type: DataTypes.STRING,
      allownull: false
    }
  });
  favoriterecipe.associate = function (models) {
    favoriterecipe.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return favoriterecipe;
};