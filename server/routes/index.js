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
    user.signUp
  );
  app.post(
    '/api/v1/user/signin',
    signInField,
    user.signIn
  );

  app.route('/api/v1/user/:userId')
    .get(
      authenticate,
      user.getCurrentUser
    )
    .put(
      authenticate,
      user.updateUserProfile
    );

  app
    .route('/api/v1/recipes')
    .get(recipes.listAllRecipes)
    .post(
      authenticate,
      recipeValidation,
      validateGetRecipe,
      recipes.createRecipe
    );

  app
    .route('/api/v1/recipes/:recipeId')
    .delete(
      authenticate,
      recipes.destroyRecipe
    )
    .put(
      authenticate,
      recipes.updateRecipe
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
    reviews.createReview
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
  app.delete(
    '/api/v1/recipe/:recipeId/favorite',
    authenticate,
    favoriteRecipe.destroyFavorite
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
