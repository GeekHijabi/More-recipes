'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUserId = exports.validateLoginUser = exports.validateUsers = exports.checkUserValidity = exports.confirmUserInput = undefined;

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require('../models/');

var _models2 = _interopRequireDefault(_models);

var _recipes = require('../controllers/recipes');

var _recipes2 = _interopRequireDefault(_recipes);

var _users = require('../controllers/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  if (typeOf(req.body.username) !== String) {
    return res.status(409).json({ message: 'Invalid Username' });
  }
  if (!filter.test(req.body.email)) return res.status(400).json({ message: "Invalid email address!" });
  next();
};

var validateUsers = exports.validateUsers = function validateUsers(req, res, next) {
  _users2.default.findOne({
    where: {
      username: req.body.username
    }
  }).then(function (user) {
    if (user) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    _users2.default.findOne({
      where: {
        email: req.body.email
      }
    }).then(function (email) {
      if (email) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      next();
    });
  });
};

var validateLoginUser = exports.validateLoginUser = function validateLoginUser(req, res, next) {
  if (!req.body.username) {
    return res.status(400).json({
      message: 'Please provide your username'
    });
  }
  if (!req.body.password) {
    return res.status(400).json({
      message: 'Please provide your password'
    });
  }
  _users2.default.findOne({
    where: {
      username: req.body.username
    }
  }).then(function (user) {
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    if (!_bcrypt2.default.compareSync(req.body.password, user.password)) {
      return res.status(400).json({ success: false, message: 'Invalid Credentials.' });
    }
    next();
  });
};

var validateUserId = exports.validateUserId = function validateUserId(req, res, next) {
  _users2.default.findOne({
    where: {
      id: req.params.userId
    }
  }).then(function (user) {
    if (!user) {
      return res.status(404).json({
        message: 'No user Id found'
      });
    }
    next();
  });
};