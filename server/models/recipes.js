'use strict';
module.exports = (sequelize, DataTypes) => {
  var recipes = sequelize.define('recipes', {
    recipeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    votes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    recipeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    reviews:{ 
      type: DataTypes.STRING,
      allowNull: false,
  },
});
  recipes.associate = (models) => {
    recipes.belongsTo(models.user,{
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return recipes;
};