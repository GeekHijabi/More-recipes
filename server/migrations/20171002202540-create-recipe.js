module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
      recipeName: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      ingredients: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      upvotes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      downvotes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      views: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: queryInterface => queryInterface.dropTable('Recipes', {
    force: true, cascade: true
  }),
};
