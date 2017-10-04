export default (sequelize, DataTypes) => {
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
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  user.associate = (models) => {
    user.hasMany(models.recipes, {
      foreignKey: 'userId',
    });
    user.hasMany(models.reviews, {
      foreignKey: 'userId',
    });
    user.hasMany(models.votes, {
      foreignKey: 'userId',
    });
    user.hasMany(models.favoriterecipe, {
      foreignKey: 'userId',
    });
  };
  return user;
};
