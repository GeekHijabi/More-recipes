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
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
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
    views: {
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
