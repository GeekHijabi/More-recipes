import { authenticate } from '../middleware/index';
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
  app.post('/api/v1/recipes', authenticate.Verify, recipeValidation, validateGetRecipe, recipes.create);
  app.delete('/api/v1/recipes/:recipeId', authenticate.Verify, recipes.destroy);
  app.put('/api/v1/recipes/:recipeId', authenticate.Verify, recipeValidation, recipes.update);
  app.get('/api/v1/users/myrecipes', authenticate.Verify, recipes.getUserRecipes);

  app.post('/api/v1/recipes/:recipeId/reviews', authenticate.Verify, reviewsValidation, reviews.create);
  app.get('/api/v1/recipes/:recipeId/reviews', authenticate.Verify, reviews.list);
  app.get('/api/v1/recipes/reviews', authenticate.Verify, reviews.list);

  app.get('/api/v1/users/:userId/recipes', authenticate.Verify, favoriteRecipe.list);
  app.post('/api/v1/users/:userId/recipes', favoriteRecipe.create);

  app.post('/api/v1/users/upvote/:recipeId', authenticate.Verify, votes.upvote);
  app.post('/api/v1/users/downvote/:recipeId', authenticate.Verify, votes.downvote);
  // app.get('api/recipes?sort=upvotes&order=desc', authenticate.Verify, votes.list);
};

export default routes;
