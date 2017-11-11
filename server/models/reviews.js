module.exports = (sequelize, DataTypes) => {
  const reviews = sequelize.define('reviews', {
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
        as: 'userId',
      }
    },
    recipeID: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'recipes',
        key: 'id',
        as: 'recipeID',
      },
    },
    reviews: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  reviews.associate = (models) => {
    reviews.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    reviews.belongsTo(models.recipes, {
      foreignKey: 'recipeID',
      onDelete: 'CASCADE',
    });
  };
  return reviews;
};
