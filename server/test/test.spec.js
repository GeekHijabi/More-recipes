import chai from 'chai';
import chaiHttp from 'chai-http';


import fakeData from './faker';
import app from '../app';
import db from '../models';

const should = chai.Should();
chai.use(chaiHttp);

let token;
let id;


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
  it('should get 404 page', (done) => {
    chai.request(app)
      .get('/ap')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  describe('User', () => {
    db.user.destroy({
      cascade: true,
      truncate: true
    });
    it('should not sign in user with no usernane', (done) => {
      chai.request(app).post('/api/user/signup')
        .send(fakeData.noUsernameInput)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').equal('No username supplied');
          done();
        });
    });
  });
  it('should create a new User', (done) => {
    chai.request(app).post('/api/user/signup')
      .send(fakeData.newUser)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message').equal('You have successfully created an account');
        res.should.be.a('object');
        done();
      });
  });
  it('should not create User with invalid email', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/signup')
      .send(fakeData.noEmailInput)
      .end((err, res) => {
        res
          .should
          .have
          .status(404);
        done();
      });
  });
});

it('should check if password is less 8 characters', (done) => {
  chai.request(app).post('/api/user/signup')
    .send(fakeData.lenPasswordShort)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('message').equal('password must be 8 characters or more');
      done();
    });
});

it('should not let user sign up with the same email/username', (done) => {
  chai.request(app)
    .post('/api/v1/users/signup')
    .send(fakeData.newUsers)
    .end((err, res) => {
      res.should.have.status(404);
      res.body.should.be.a('object');
      done();
    });
});

describe('Recipes', () => {
  const recipes = {
    recipeName: 'Rice',
    ingredients: 'water rice',
    description: 'boil rice',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciIadbnmdhyyQiOjIsInVzZXJuYW1lIjoiaWJyYWhpbSIsImZ1bGxuYW1lIjoidG9wZSBqb3kifSwiaWF0IjoxNTA0NTEzMTE2fQ.FzccsjyPbE9ExFKuhZx4ljZUZKGQjtm3CIZY6sqZ5bY'
  };
  it('should get all recipe', (done) => {
    chai.request(app)
      .get('/api/v1/recipes')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should let unauthorized user delete a recipe', (done) => {
    chai.request(app)
      .delete(`/api/v1/recipes/${id}`)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});

