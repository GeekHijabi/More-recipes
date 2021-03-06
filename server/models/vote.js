module.exports = (sequelize, DataTypes) => {
  const vote = sequelize.define('Vote', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Recipe',
        key: 'id'
      }
    },
    upvotes: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    downvotes: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
  });
  vote.associate = (models) => {
    vote.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    vote.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
  };
  return vote;
};
