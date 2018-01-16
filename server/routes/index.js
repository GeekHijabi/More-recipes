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

  app.post(
    '/api/v1/user/signup',
    signUpField,
    user.signup
  );
  app.post(
    '/api/v1/user/signin',
    signInField,
    user.signin
  );

  app.get(
    '/api/v1/user',
    authenticate,
    user.getCurrentUser
  );

  app.put(
    '/api/v1/user/update-profile',
    authenticate,
    user.updateuserprofile
  );

  app.get(
    '/api/v1/recipes',
    recipes.listAllRecipes
  );
  app.post(
    '/api/v1/recipes',
    authenticate,
    recipeValidation,
    validateGetRecipe,
    recipes.create
  );

  app.delete(
    '/api/v1/recipes/:recipeId',
    authenticate,
    recipes.destroy
  );

  app.put(
    '/api/v1/recipes/:recipeId',
    authenticate,
    recipes.update
  );

  app.get(
    '/api/v1/myrecipes',
    authenticate,
    recipes.getUserRecipes
  );

  app.get(
    '/api/v1/recipe/:recipeId',
    authenticate,
    recipes.getSingleRecipe
  );
  app.get(
    '/api/v1/favorites',
    authenticate,
    recipes.listAllFavoriteRecipes
  );

  app.get(
    '/api/v1/search',
    recipes.searchRecipe
  );

  app.post(
    '/api/v1/recipes/:recipeId/review',
    authenticate,
    reviewsValidation,
    reviews.create
  );
  app.get(
    '/api/v1/recipe/:recipeId/review',
    authenticate,
    reviews.getSingleReview
  );
  app.delete(
    '/api/v1/recipe/:id/review',
    authenticate,
    reviews.destroySingleReview
  );
  app.get(
    '/api/v1/user/:userId/favorites',
    authenticate,
    favoriteRecipe.list
  );
  app.post(
    '/api/v1/recipe/:recipeId/favorite',
    authenticate, favoriteRecipe.create
  );

  app.post(
    '/api/v1/recipe/:recipeId/upvote',
    authenticate,
    votes.upvote
  );

  app.post(
    '/api/v1/recipe/:recipeId/downvote',
    authenticate,
    votes.downvote
  );
};

export default routes;
