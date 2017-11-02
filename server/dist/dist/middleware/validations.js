'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkUserValidity = exports.confirmUserInput = undefined;

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require('../models/');

var _models2 = _interopRequireDefault(_models);

var _recipes = require('../controllers/recipes');

var _recipes2 = _interopRequireDefault(_recipes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_dotenv2.default.load();

var confirmUserInput = exports.confirmUserInput = function confirmUserInput(req, res, next) {
  if (!req.body.userName) {
    return res.status(400).json({ message: 'No username supplied' });
  }
  if (!req.body.email) {
    return res.status(400).json({ message: 'Please supply valid email address' });
  }
  if (!req.body.password) {
    return res.status(400).json({ message: 'Password is required' });
  }
  next();
};

var checkUserValidity = exports.checkUserValidity = function checkUserValidity(req, res, next) {
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (req.body.userName.length < 5) {
    return res.status(400).json({ errorMessage: 'Please provide a username with atleast 5 characters.' });
  }
  if (!req.body.email) {
    return res.status(400).json({ message: 'Please supply valid email address' });
  }
  if (req.body.password.length < 8) {
    return res.status(400).json({ message: 'password must be 8 characters or more' });
  }
  if (!filter.test(req.body.email)) {
    return res.status(400).json({ message: 'Invalid email address!' });
  }
  next();
};