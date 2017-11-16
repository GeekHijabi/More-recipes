import authenticate from '../middleware/authenticate';
import { signUpField,
  signInField,
  validateGetRecipe,
  recipeValidation,
  reviewsValidation } from '../middleware/validations';
import user from '../controllers/user';
import recipes from '../controllers/recipes';
import reviews from '../controllers/reviews';
import favoriteRecipe from '../controllers/favoriteRecipe';
import votes from '../controllers/votes';

const routes = (app) => {
  app.get('/api/v1', (req, res) => {
    res.status(200).send({
      message: 'Welcome to more recipes API'
    });
  });

  app.post('/api/v1/user/signup', signUpField, user.signup);
  app.post('/api/v1/user/signin', signInField, user.signin);

  app.get('/api/v1/recipes', recipes.listAllRecipes);
  app.post('/api/v1/recipes', authenticate, recipeValidation, validateGetRecipe, recipes.create);
  app.delete('/api/v1/recipes/:recipeId', authenticate, recipes.destroy);
  app.put('/api/v1/recipes/:recipeId', authenticate, recipeValidation, recipes.update);
  app.get('/api/v1/users/myrecipes', authenticate, recipes.getUserRecipes);

  app.post('/api/v1/recipes/:recipeId/reviews', authenticate, reviewsValidation, reviews.create);
  app.get('/api/v1/recipes/:recipeId/reviews', authenticate, reviews.list);
  app.get('/api/v1/recipes/reviews', authenticate, reviews.list);

  app.get('/api/v1/users/:userId/recipes', authenticate, favoriteRecipe.list);
  app.post('/api/v1/users/:userId/recipes', authenticate, favoriteRecipe.create);

  app.post('/api/v1/users/upvote/:recipeId', authenticate, votes.upvote);
  app.post('/api/v1/users/downvote/:recipeId', authenticate, votes.downvote);
};

export default routes;
