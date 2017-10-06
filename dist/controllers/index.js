'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _recipes = require('./recipes');

var _recipes2 = _interopRequireDefault(_recipes);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _reviews = require('./reviews');

var _reviews2 = _interopRequireDefault(_reviews);

var _favoriterecipe = require('./favoriterecipe');

var _favoriterecipe2 = _interopRequireDefault(_favoriterecipe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  recipes: _recipes2.default,
  user: _users2.default,
  reviews: _reviews2.default,
  favoriterecipe: _favoriterecipe2.default
};