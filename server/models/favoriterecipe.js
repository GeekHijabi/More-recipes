export default(sequelize, DataTypes) => {
  const favoriterecipe = sequelize.define('favoriterecipe', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
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
