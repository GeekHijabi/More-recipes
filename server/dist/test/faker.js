'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fakeData = {
  signup1: {
    firstName: 'bestie',
    email: 'bestie@bestie.com',
    lastName: '',
    password: 'bestyyy'

  },

  user2: {
    firstName: 'foodie',
    email: 'foodie@food.com',
    lastName: '',
    password: 'foodlova'

  },

  recipe1: {
    recipeName: 'rice',
    ingredients: 'water, rice',
    description: 'boil rice'

  },

  reviews: {
    recipeName: 'rice',
    reviews: 'yummy'

  }
};
exports.default = fakeData;