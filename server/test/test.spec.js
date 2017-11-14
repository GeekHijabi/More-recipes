import chai from 'chai';
import chaiHttp from 'chai-http';


import fakeData from './faker';
import app from '../app';
import db from '../models';

const should = chai.Should();
chai.use(chaiHttp);

let token;

describe('More Recipes', () => {
  it('should get the home page', (done) => {
    chai
      .request(app)
      .get('/api/v1')
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
  });
  it('should create a new User', (done) => {
    chai.request(app).post('/api/v1/user/signup')
      .send(fakeData.newUser)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('should not create user with details that exists already', (done) => {
    chai.request(app).post('/api/v1/user/signup')
      .send(fakeData.newUser)
      .end((err, res) => {
        res.body.should.have
          .property('message')
          .equal('User already exists');
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
  it('should create object response for user signup', (done) => {
    chai.request(app).post('/api/v1/user/signup')
      .send(fakeData.newUser)
      .end((err, res) => {
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
          .status(400);
        done();
      });
  });
  it('should check if email address is supplied', (done) => {
    chai.request(app).post('/api/v1/user/signup')
      .send(fakeData.noEmailInput)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property('message')
          .equal('Please supply valid email address');
        done();
      });
  });
  it('should check if password is supplied', (done) => {
    chai.request(app).post('/api/v1/user/signup')
      .send(fakeData.noPasswordInput)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property('message')
          .equal('password cannot be empty');
        done();
      });
  });
  it('should check if password is less than 8 characters', (done) => {
    chai.request(app).post('/api/v1/user/signup')
      .send(fakeData.lenPasswordShort)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property('message')
          .equal('password must be 8 characters or more');
        done();
      });
  });
  it('should not create user without first name', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/signup')
      .send(fakeData.noFirstNameInput)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should not create user without last name', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/signup')
      .send(fakeData.nolastNameInput)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should not create user with empty first name', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/signup')
      .send(fakeData.IncorrectFirstNameInput)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property('message')
          .equal('Input a valid first Name');
        done();
      });
  });
  it('should not create user with empty last name', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/signup')
      .send(fakeData.IncorrectLastNameInput)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property('message')
          .equal('Input a valid last Name');
        done();
      });
  });
  it('should not create user without last name', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/signup')
      .send(fakeData.nolastNameInput)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('Recipes', () => {
  it('should get all recipe', (done) => {
    chai.request(app)
      .get('/api/v1/recipes')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should not let unauthorized user delete a recipe', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/:recipeId')
      .end((err, res) => {
        res.body.should.have.property('message').equal('Unauthorised User!');
        done();
      });
  });
  it('should not let unauthorized user add a recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .end((err, res) => {
        res.body.should.have.property('message').equal('Unauthorised User!');
        done();
      });
  });
  it('should not let unauthorized user put a recipe', (done) => {
    chai.request(app)
      .put('/api/v1/recipes/:recipeId')
      .end((err, res) => {
        res.body.should.have.property('message').equal('Unauthorised User!');
        done();
      });
  });
  it('should not let unauthorized user review a recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/:recipeId/reviews')
      .end((err, res) => {
        res.body.should.have.property('message').equal('Unauthorised User!');
        done();
      });
  });
});

