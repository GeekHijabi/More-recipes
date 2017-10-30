'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confirmLogin = exports.authenticate = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_dotenv2.default.load();

var authenticate = exports.authenticate = {
  Verify: function Verify(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-token'];
    if (!token) {
      return res.status(403).send({
        message: 'Unauthorised User!'
      });
    }

    _jsonwebtoken2.default.verify(token, process.env.secretKey, function (err, decoded) {
      if (err) {
        return res.status(403).send({
          error: 'Token could not be authenticated'
        });
      }
      req.decoded = decoded;
      next();
    });
  }
};

var confirmLogin = exports.confirmLogin = function confirmLogin(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['access-token'];
  if (token) {
    _jsonwebtoken2.default.verify(token, key, function (err, decoded) {
      if (err) {
        res.status(401).json({ status: 'unsuccessful', message: 'Token authentication failed' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).json({
      status: 'fail',
      message: 'No token provided.'
    });
  }
  next();
};