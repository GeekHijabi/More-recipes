'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.load();
var secret = process.env.secretKey;
var users = _models2.default.user;

exports.default = {
  signup: function signup(req, res) {
    users.findOne({
      where: { email: req.body.email }
    }).then(function (user) {
      if (user) {
        return res.status(400).json({
          message: 'User already exists'
        });
      }
      return users.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: _bcrypt2.default.hashSync(req.body.password, 10)
      }).then(function (display) {
        return res.status(201).json({
          status: 'success',
          message: 'You have successfully created an account',
          display: display
        });
      }).catch(function (error) {
        return res.status(400).send(error);
      });
    }).catch(function (error) {
      return res.status(500).send(error);
    });
  },
  signin: function signin(req, res) {
    return users.findOne({
      where: { userName: req.body.userName }
    }).then(function (user) {
      if (user) {
        var currentUser = {
          userId: user.id,
          userName: user.userName,
          email: user.email
        };
        var token = _jsonwebtoken2.default.sign({ currentUser: currentUser }, secret);
        res.status(200).json({
          status: 'success',
          message: 'You have successfully signed in!',
          data: { token: token, userId: user.id }
        });
      } else {
        return res.status(404).send({
          message: 'User not found'
        });
      }
    });
  }
};