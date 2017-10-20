import { authenticate } from '../middleware/index';
import { confirmUserInput, checkUserValidity } from '../middleware/validations';
import usersController from '../controllers/users';
import recipesController from '../controllers/recipes';
import reviewsController from '../controllers/reviews';
import favoriterecipeController from '../controllers/favoriterecipe';


const routes = (app) => {
  app.get('/api', (req, res) => {
    res.status(200).send({
      message: 'Welcome to more recipes API'
    });
  });

  app.post('/api/user/signup', confirmUserInput, checkUserValidity, usersController.signup);
  app.post('/api/user/signin', usersController.signin);

  app.get('/api/v1/recipes', recipesController.list);
  app.post('/api/v1/recipes', authenticate.Verify, recipesController.create);
  app.delete('/api/v1/recipes/:recipeId', authenticate.Verify, recipesController.destroy);
  app.put('/api/v1/recipes/:recipeId', authenticate.Verify, recipesController.update);
  
  app.post('/api/v1/recipes/:recipeId/reviews', authenticate.Verify, reviewsController.create);
  app.get('/api/v1/recipes/:recipeId/reviews', authenticate.Verify, reviewsController.list);
  app.get('/api/v1/recipes/reviews', authenticate.Verify, reviewsController.list);

  app.get('/api/v1/users/:userId/recipes', authenticate.Verify, favoriterecipeController.list);
  app.post('/api/v1/users/:userId/recipes', favoriterecipeController.create);
  

  app.post('/api/v1/users/upvote/:recipeId', authenticate.Verify, votesController.upvote);
  app.get('api/recipes?sort=upvotes&order=desc', authenticate.Verify,votesController.list)
  
};

export default routes;

