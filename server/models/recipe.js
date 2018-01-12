export default (sequelize, DataTypes) => {
  const recipe = sequelize.define('Recipe', {
    recipeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    preptime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    servings: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    upvotes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    downvotes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    favoriteCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });
  recipe.associate = (models) => {
    recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    recipe.hasMany(models.Review, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    recipe.hasMany(models.Favorite, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    recipe.hasMany(models.Vote, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
  };
  return recipe;
};
