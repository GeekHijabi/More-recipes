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
    downvote: function downvote(req, res) {
        return recipes.findOne({
            where: {
                id: req.params.recipeId
            }
        }).then(function (recipe) {
            recipe.decrement('votes').then(function () {
                recipe.reload();
            });
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    },
    upvote: function upvote(req, res) {
        return recipes.findOne({
            where: {
                id: rew.params.recipeId
            }
        }).then(function (recipe) {
            recipe.increment('votes').then(function () {
                recipe.reload();
            });
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    }
};