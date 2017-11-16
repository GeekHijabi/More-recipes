export default (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
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
  user.prototype.toJSON = function removePassword() {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };
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
