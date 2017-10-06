module.exports = (sequelize, DataTypes) => {
  const votes = sequelize.define('votes', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    upvotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    downvotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  votes.associate = (models) => {
    votes.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    votes.belongsTo(models.user, {
      foreignKey: 'recipeId'
    });
  };
  return votes;
};
