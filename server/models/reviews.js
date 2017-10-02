module.exports = (sequelize, DataTypes) => {
  const reviews = sequelize.define('reviews', {
    recipeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    reviews: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  reviews.associate = (models) => {
    reviews.belongsTo(models.user,{
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return reviews;
};