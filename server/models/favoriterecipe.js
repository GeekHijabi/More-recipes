export default (sequelize, DataTypes) => {
  const favoriterecipe = sequelize.define('favoriterecipe', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  favoriterecipe.associate = (models) => {
    favoriterecipe.belongsTo(models.recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });

    favoriterecipe.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };


  return favoriterecipe;
};
