import authenticate from '../middleware';
import { confirmUserInput } from '../middleware/validations';
import usersController from '../controllers/users';
import recipesController from '../controllers/recipes';

const routes = (app) => {
  app.get('/api', (req, res) => {
    res.status(200).send({
      message: 'Welcome to more recipes API'
    });
  });

  app.post('/api/recipes', authenticate.Verify, recipesController.create);

  app.post('/api/user/signup', confirmUserInput, usersController.signup);
};

export default routes;

