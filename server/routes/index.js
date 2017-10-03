const recipesController = require('../controllers').recipes;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to more recipes API',
  }));

  app.post('/api/recipes', recipesController.create);
};

// import express from 'express';
// import {Recipe} from '../controllers/recipes';
// import {review} from "../controllers/reviews";

// const recipeController = new Recipe()
// const reviewController = new review();

// let router = express.Router();

// router.post('/', recipeController.addRecipe);
// router.get('/', recipeController.getRecipe);
// router.delete('/:Id', recipeController.deleteRecipe);
// router.post('/:Id/reviews', reviewController.add);
// router.put('/:Id', recipeController.put)


// export default router;
