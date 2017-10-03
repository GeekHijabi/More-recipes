export default(sequelize, DataTypes) => {
  const favoriterecipe = sequelize.define('favoriterecipe', {
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
  favoriterecipe.associate = (models) => {
    favoriterecipe.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return favoriterecipe;
};
