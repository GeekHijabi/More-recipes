module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { 
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
   user.associate = (models) => {
    user.hasMany(model.recipes,{
      foreignKey: 'userId',
      as: 'recipesId',
    });
    user.hasMany(model.reviews,{
      foreignKey: 'userId',
      as: 'recipesId',
    });
    user.hasMany(models.votes,{
      foreignKey:'userId',
      as: 'recipesId',
    });
    user.hasMany(model.favouriteRecipes,{
      foreignKey: 'userId',
      as: 'recipeId'
    });
  };
  return user;
};