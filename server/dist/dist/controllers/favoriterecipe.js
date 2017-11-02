'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var favoriterecipe = _models2.default.favoriterecipe;
exports.default = {
  create: function create(req, res) {
    var token = req.headers['x-token'];
    var decodedToken = _jsonwebtoken2.default.decode(token);
    return favoriterecipe.create({
      recipeId: req.params.recipeId,
      userId: decodedToken.currentUser.userId,
      category: req.body.category
    }).then(function (favorite) {
      return res.status(200).json({
        status: 'success',
        message: 'You successfully choose recipe id ' + req.params.recipeId + ' as your favorite recipes',
        data: { userId: favorite.userId, recipeId: favorite.recipeId }
      });
    }).catch(function (error) {
      res.status(400).json(error);
    });
  },
  list: function list(req, res) {
    return favoriterecipe.findAll({
      where: { userId: req.params.userId },
      include: [{
        model: _models2.default.recipes,
        attributes: ['recipeName', 'ingredient', 'details', 'votes'],
        include: [{
          model: _models2.default.user,
          attributes: ['fullName', 'updatedAt']
        }]
      }]
    }).then(function (favoriterecipe) {
      if (favoriterecipe.length < 1) {
        res.status(404).json({
          message: 'No favorite recipe found'
        });
      } else {
        res.status(200).json(favoriterecipe);
      }
    }).catch(function (error) {
      return res.status(404).json(error);
    });
  }
};