module.exports = (sequelize, DataTypes) => {
  const recipes = sequelize.define('recipes', {
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
    UserId: {
      type: DataTypes.INTEGER,
      references:{
      model: 'users',
      key: 'id',
      as: 'userId',
      },
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