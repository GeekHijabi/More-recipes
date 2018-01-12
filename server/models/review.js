module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define('Review', {
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'User',
        key: 'id',
        as: 'userId',
      }
    },
    recipeId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Recipe',
        key: 'id',
        as: 'recipeId',
      },
    },
    reviews: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  });
  review.associate = (models) => {
    review.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    review.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
  };
  return review;
};
