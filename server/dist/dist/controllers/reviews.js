'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var reviews = _models2.default.reviews;
exports.default = {
  create: function create(req, res) {
    return reviews.create({
      recipeID: req.params.recipeId,
      reviews: req.body.reviews,
      recipeName: req.body.recipeName
    }).then(function (data) {
      return res.status(200).json({
        status: 'success',
        message: 'Your recipe has been reviewed',
        data: { userId: data.userId, recipeId: data.recipeId }
      });
    }).catch(function (error) {
      return res.status(400).json(error);
    });
  },
  list: function list(req, res) {
    if (req.query.order) {
      return reviews.findAll({
        order: [['upvotes', 'DESC']]
      }).then(function (sortedReviews) {
        return res.status(200).send(sortedReviews);
      });
    }
    return reviews.findAll({ offset: req.query.next }).then(function (Reviews) {
      if (!Reviews) {
        return res.status(200).send({
          Message: 'No recipes created!'
        });
      }
      return res.status(200).send(Reviews);
    });
  }
};