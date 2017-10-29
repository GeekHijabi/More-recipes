import faker from 'faker';

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import models from '../models';

const expect = chai.expect;

const should = require('chai').should();
chai.use(chaiHttp);

describe('More Recipes', () => {
  it('should get the home page', (done) => {
    chai
      .request(app)
      .get('/api')
      .end((err, res) => {
        res
          .should
          .have
          .status(200);
        done();
      });
  });

  it('should create a new User', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'testyyy', email: 'test@gmail.com', password: 'testyyyy'
      })
      .res
      .should
      .have
      .status(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res
          .body
          .username
          .should
          .be('testyyyy');
        res
          .body
          .message
          .should
          .be('You have successfully signed up');
        done();
      });
  });
  it('should not create User with invalid email', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'password',
        email: 'fraiser',
        password: 'password'
      })
      .res
      .should
      .have
      .status(409)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res
          .should
          .have
          .status(res);
        done();
      });
  });
});

it('should not return password', (done) => {
  chai
    .request(app)
    .post('/api/v1/users/signup')
    .send({
      username: 'testtyy',
      email: 'test@gmail.com',
      password: 'testrcyy'
    })
    .res
    .should
    .have
    .status(201)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      res
        .body
        .should
        .be({
          // something
        });
      done();
    });
});

it('should check if password is less 8 characters', (done) => {
  chai
    .request(app)
    .post('/api/v1/users/signup')
    .send({
      username: 'rowland',
      email: 'rxxxx@co.com',
      password: 'ace'
    })
    .res
    .should
    .have
    .status(409)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      res
        .should
        .have
        .status(res);
      done();
    });
});

it('should return 200 for get request', (done) => {
  chai
    .request(app)
    .post('/api/v1/recipes')
    .end((err, res) => {
      res
        .should
        .have
        .status(200);
      done();
    });
});

it('should return 200 for delete request', (done) => {
  chai
    .request(app)
    .delete('/api/v1/recipes')
    .end((err, res) => {
      res
        .should
        .have
        .status(200);
      done();
    });
});

it('should return 200 for put request', (done) => {
  chai
    .request(app)
    .add('/api/v1/recipes')
    .end((err, res) => {
      res
        .should
        .have
        .status(200);
      done();
    });
});

