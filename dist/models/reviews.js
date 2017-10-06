'use strict';

module.exports = function (sequelize, DataTypes) {
  var reviews = sequelize.define('reviews', {
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
        as: 'userId'
      }
    },
    recipeName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recipeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    reviews: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  reviews.associate = function (models) {
    reviews.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    reviews.belongsTo(models.recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
  };
  return reviews;
};