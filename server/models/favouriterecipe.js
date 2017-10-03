export default(sequelize, DataTypes) => {
  const favouriteRecipe = sequelize.define('favouriteRecipe', {
    recipeID: {
      type: DataTypes.INTEGER,
      allownull: false,
      unique: true,
    },
    category: {
      type: DataTypes.STRING,
      allownull: false,
    },
  });
  favouriteRecipe.associate = (models) => {
    favouriteRecipe.belongsTo(models.user,{
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return favouriteRecipe;
};