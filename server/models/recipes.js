export default (sequelize, DataTypes) => {
  const recipes = sequelize.define('recipes', {
    recipeName: {
      type: DataTypes.STRING,
      allowNull: false,
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
      references: {
        model: 'users',
        key: 'id',
        as: 'userId',
      },
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
  recipes.associate = (models) => {
    recipes.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    recipes.hasMany(models.reviews, {
      foreignKey: 'recipeID',
      onDelete: 'CASCADE',
    });
    recipes.hasMany(models.favoriterecipe, {
      foreignKey: 'recipeID',
      onDelete: 'CASCADE',
    });
    recipes.hasMany(models.votes, {
      foreignKey: 'recipeID',
      onDelete: 'CASCADE',
    });
  };
  return recipes;
};
