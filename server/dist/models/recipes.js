'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var recipes = sequelize.define('recipes', {
    recipeName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vote: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
        as: 'userId'
      }
    }
  });
  recipes.associate = function (models) {
    recipes.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    recipes.hasMany(models.reviews, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
    recipes.hasMany(models.favoriterecipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
    recipes.hasMany(models.votes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
  };
  return recipes;
};