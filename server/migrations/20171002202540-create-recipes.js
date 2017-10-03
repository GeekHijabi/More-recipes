module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      recipeName: {
        type: Sequelize.STRING
      },
      ingredients: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      votes: {
        type: Sequelize.STRING
      },
      recipeID: {
        type: Sequelize.INTEGER
      },
      reviews: {
        type: Sequelize.STRING
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
  down: (queryInterface/*, Sequelize*/) => queryInterface.dropTable('recipes'),
};