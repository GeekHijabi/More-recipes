export default (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
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
    bio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
  });
  user.associate = (models) => {
    user.hasMany(models.Recipe, {
      foreignKey: 'userId',
    });
    user.hasMany(models.Review, {
      foreignKey: 'userId',
    });
    user.hasMany(models.Vote, {
      foreignKey: 'userId',
    });
    user.hasMany(models.Favorite, {
      foreignKey: 'userId',
    });
  };
  return user;
};
