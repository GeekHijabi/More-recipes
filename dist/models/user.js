'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var user = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
    }
  });
  user.prototype.toJSON = function toJSON() {
    var values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };
  user.associate = function (models) {
    user.hasMany(models.recipes, {
      foreignKey: 'userId'
    });
    user.hasMany(models.reviews, {
      foreignKey: 'userId'
    });
    user.hasMany(models.votes, {
      foreignKey: 'userId'
    });
    user.hasMany(models.favoriterecipe, {
      foreignKey: 'userId'
    });
  };
  return user;
};