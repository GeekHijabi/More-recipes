'use strict';

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;

var should = require('chai').should();
_chai2.default.use(_chaiHttp2.default);

describe('More Recipes', function () {
  it('should get the home page', function (done) {
    _chai2.default.request(_app2.default).get('/api').end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });

  it('should create a new User', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signup').send({
      username: 'testyyy', email: 'test@gmail.com', password: 'testyyyy'
    }).res.should.have.status(201).end(function (err, res) {
      if (err) {
        return done(err);
      }
      res.body.username.should.be('testyyyy');
      res.body.message.should.be('You have successfully signed up');
      done();
    });
  });
  it('should not create User with invalid email', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/signup').send({
      username: 'password',
      email: 'fraiser',
      password: 'password'
    }).res.should.have.status(409).end(function (err, res) {
      if (err) {
        return done(err);
      }
      res.should.have.status(res);
      done();
    });
  });
});

it('should not return password', function (done) {
  _chai2.default.request(_app2.default).post('/api/v1/users/signup').send({
    username: 'testtyy',
    email: 'test@gmail.com',
    password: 'testrcyy'
  }).res.should.have.status(201).end(function (err, res) {
    if (err) {
      return done(err);
    }
    res.body.should.be({
      // something
    });
    done();
  });
});

it('should check if password is less 8 characters', function (done) {
  _chai2.default.request(_app2.default).post('/api/v1/users/signup').send({
    username: 'rowland',
    email: 'rxxxx@co.com',
    password: 'ace'
  }).res.should.have.status(409).end(function (err, res) {
    if (err) {
      return done(err);
    }
    res.should.have.status(res);
    done();
  });
});

it('should return 200 for get request', function (done) {
  _chai2.default.request(_app2.default).post('/api/v1/recipes').end(function (err, res) {
    res.should.have.status(200);
    done();
  });
});

it('should return 200 for delete request', function (done) {
  _chai2.default.request(_app2.default).delete('/api/v1/recipes').end(function (err, res) {
    res.should.have.status(200);
    done();
  });
});

it('should return 200 for put request', function (done) {
  _chai2.default.request(_app2.default).add('/api/v1/recipes').end(function (err, res) {
    res.should.have.status(200);
    done();
  });
});