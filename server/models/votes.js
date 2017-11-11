module.exports = (sequelize, DataTypes) => {
  const votes = sequelize.define('votes', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    recipeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'recipes',
        key: 'id'
      }
    },
    upvotes: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    downvotes: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
  });
  votes.associate = (models) => {
    votes.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    votes.belongsTo(models.user, {
      foreignKey: 'recipeID'
    });
  };
  return votes;
};
