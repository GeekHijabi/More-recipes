'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var recipes = _models2.default.recipes;
exports.default = {
  create: function create(req, res) {
    var token = req.headers['x-token'];
    var decodedToken = _jsonwebtoken2.default.decode(token);
    return recipes.create({
      recipeName: req.body.recipeName,
      description: req.body.description,
      name: req.body.name || '',
      ingredients: req.body.ingredients,
      userId: decodedToken.currentUser.userId
    }).then(function (data) {
      return res.status(201).json({
        status: 'success',
        recipeName: data.recipeName,
        message: 'Recipe added successfully',
        data: { recipeId: data.id, userId: data.userId }
      });
    }).catch(function (error) {
      res.status(400).json(error);
    });
  },
  list: function list(req, res) {
    if (req.query.order) {
      return recipes.findAll({
        order: [['upvotes', 'DESC']]
      }).then(function (sortedRecipes) {
        return res.status(200).send(sortedRecipes);
      });
    }
    return recipes.findAll({ offset: req.query.next }).then(function (Recipes) {
      if (!Recipes) {
        return res.status(200).send({
          Message: 'No recipes created!'
        });
      }
      return res.status(200).send(Recipes);
    });
  },
  update: function update(req, res) {
    return recipes.find({
      where: {
        id: req.params.recipeId
      }
    }).then(function (found) {
      if (found) {
        return found.update({
          recipeName: req.body.recipeName || found.recipeName,
          description: req.body.description || found.description,
          ingredients: req.body.ingredients
        }, {
          where: {
            id: req.params.recipeId
          }
        }).then(function (updated) {
          return res.status(200).json({
            status: 'success',
            updated: updated
          });
        });
      }
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  },
  destroy: function destroy(req, res) {
    return recipes.find({
      where: {
        id: req.params.recipeId
      }
    }).then(function (found) {
      if (!found) {
        return res.status(404).send({
          message: 'recipe Not Found'
        });
      }
      return recipes.destroy({
        where: {
          id: req.params.recipeId
        }
      }).then(function () {
        return res.status(200).send('Recipe deleted successfully');
      }).catch(function (error) {
        return res.status(400).send('Recipe cannot be deleted');
      });
    }).catch(function (error) {
      res.status(400).send(error);
    });
  }
};