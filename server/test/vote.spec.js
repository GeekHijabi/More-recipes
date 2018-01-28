import chai from 'chai';
import chaiHttp from 'chai-http';


import fakeData from './faker';
import app from '../app';
import db from '../models';

const should = chai.Should();
chai.use(chaiHttp);

let token;

describe('Vote', () => {
  beforeEach((done) => {
    chai.request(app).post('/api/v1/user/signup')
      .send(fakeData.newUser)
      .end((err, res) => {
        res.should.have.status(201);
        chai.request(app)
          .post('/api/v1/user/signin')
          .send(fakeData.signedInUser2)
          .end((err, res) => {
            token = res.body.token;
            done();
          });
      });
  });
  afterEach(() => db.User.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
  }));
  it('should let user add a recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-token', token)
      .send(fakeData.recipe1)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(201);
        res.body.should.have.property('recipeName');
        done();
      });
  });
  describe('Votes', () => {
    beforeEach((done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('x-token', token)
        .send(fakeData.recipe1)
        .end(() => {
          done();
        });
    });
    it('should let user upvote a recipe', (done) => {
      chai.request(app)
        .post('/api/v1/recipe/1/upvote')
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').equal('Successfully upvoted');
          done();
        });
    });
    it('should let user remove upvote', (done) => {
      chai.request(app)
        .post('/api/v1/recipe/1/upvote')
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should let user downvote a recipe', (done) => {
      chai.request(app)
        .post('/api/v1/recipe/1/downvote')
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').equal('Successfully downvoted');
          done();
        });
    });
  });
});

