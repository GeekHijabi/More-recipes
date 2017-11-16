export default (sequelize, DataTypes) => {
  const favorite = sequelize.define('Favorite', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  favorite.associate = (models) => {
    favorite.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });

    favorite.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return favorite;
};
