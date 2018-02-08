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


const baseUrl = '/api/v1';

const routes = (app) => {
  app.get(`${baseUrl}`, (req, res) => {
    res.status(200).send({
      message: 'Welcome to more recipes API'
    });
  });


  app.post(
    `${baseUrl}/user/signup`,
    signUpField,
    user.signUp
  );
  app.post(
    `${baseUrl}/user/signin`,
    signInField,
    user.signIn
  );

  app.route(`${baseUrl}/user/:userId`)
    .get(
      authenticate,
      user.getCurrentUser
    )
    .patch(
      authenticate,
      user.updateUserProfile
    );

  app.route(`${baseUrl}/forgot-password/:userId`)
    .post(user.forgotPassword);

  app.route(`${baseUrl}/reset-password/:userId`)
    .post(authenticate, user.resetPassword);

  app
    .route(`${baseUrl}/recipes`)
    .get(recipes.listAllRecipes)
    .post(
      authenticate,
      recipeValidation,
      validateGetRecipe,
      recipes.createRecipe
    );

  app
    .route(`${baseUrl}/recipes/:recipeId`)
    .delete(
      authenticate,
      recipes.destroyRecipe
    )
    .patch(
      authenticate,
      recipes.updateRecipe
    );

  app.get(
    `${baseUrl}/myrecipes`,
    authenticate,
    recipes.getUserRecipes
  );

  app.get(
    `${baseUrl}/recipe/:recipeId`,
    authenticate,
    recipes.getSingleRecipe
  );
  app.post(
    `${baseUrl}/recipe/:recipeId/views`,
    authenticate,
    recipes.updateRecipeView
  );
  app.get(
    `${baseUrl}/favorites`,
    authenticate,
    recipes.listAllFavoriteRecipes
  );

  app.get(
    `${baseUrl}/search`,
    recipes.searchRecipe
  );

  app.post(
    `${baseUrl}/recipes/:recipeId/review`,
    authenticate,
    reviewsValidation,
    reviews.createReview
  );
  app.get(
    `${baseUrl}/recipe/:recipeId/review`,
    authenticate,
    reviews.getSingleReview
  );
  app.delete(
    `${baseUrl}/recipe/:id/review`,
    authenticate,
    reviews.destroySingleReview
  );
  app.get(
    `${baseUrl}/user/:userId/favorites`,
    authenticate,
    favoriteRecipe.list
  );
  app.post(
    `${baseUrl}/recipe/:recipeId/favorite`,
    authenticate, favoriteRecipe.create
  );
  app.delete(
    `${baseUrl}/recipe/:recipeId/favorite`,
    authenticate,
    favoriteRecipe.destroyFavorite
  );

  app.post(
    `${baseUrl}/recipe/:recipeId/upvote`,
    authenticate,
    votes.upvote
  );

  app.post(
    `${baseUrl}/recipe/:recipeId/downvote`,
    authenticate,
    votes.downvote
  );
};

export default routes;
