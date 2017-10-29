'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../middleware/index');

var _validations = require('../middleware/validations');

var _users = require('../controllers/users');

var _users2 = _interopRequireDefault(_users);

var _recipes = require('../controllers/recipes');

var _recipes2 = _interopRequireDefault(_recipes);

var _reviews = require('../controllers/reviews');

var _reviews2 = _interopRequireDefault(_reviews);

var _favoriterecipe = require('../controllers/favoriterecipe');

var _favoriterecipe2 = _interopRequireDefault(_favoriterecipe);

var _votes = require('../controllers/votes');

var _votes2 = _interopRequireDefault(_votes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = function routes(app) {
  app.get('/api', function (req, res) {
    res.status(200).send({
      message: 'Welcome to more recipes API'
    });
  });

  app.post('/api/user/signup', _validations.confirmUserInput, _validations.checkUserValidity, _users2.default.signup);
  app.post('/api/user/signin', _users2.default.signin);

  app.get('/api/v1/recipes', _recipes2.default.list);
  app.post('/api/v1/recipes', _index.authenticate.Verify, _recipes2.default.create);
  app.delete('/api/v1/recipes/:recipeId', _index.authenticate.Verify, _recipes2.default.destroy);
  app.put('/api/v1/recipes/:recipeId', _index.authenticate.Verify, _recipes2.default.update);

  app.post('/api/v1/recipes/:recipeId/reviews', _index.authenticate.Verify, _reviews2.default.create);
  app.get('/api/v1/recipes/:recipeId/reviews', _index.authenticate.Verify, _reviews2.default.list);
  app.get('/api/v1/recipes/reviews', _index.authenticate.Verify, _reviews2.default.list);

  app.get('/api/v1/users/:userId/recipes', _index.authenticate.Verify, _favoriterecipe2.default.list);
  app.post('/api/v1/users/:userId/recipes', _favoriterecipe2.default.create);

  app.post('/api/v1/users/upvote/:recipeId', _index.authenticate.Verify, _votes2.default.upvote);
  // app.get('api/recipes?sort=upvotes&order=desc', authenticate.Verify, votesController.list);
};

exports.default = routes;