import chai from 'chai';
import chaiHttp from 'chai-http';


import fakeData from './faker';
import app from '../app';
import db from '../models';

// const should = chai.Should();
chai.should();
chai.use(chaiHttp);

const baseUrl = '/api/v1';
let token;

describe('Favorite controller', () => {
  beforeEach((done) => {
    chai.request(app).post(`${baseUrl}/user/signup`)
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
  it('should add a new recipe', (done) => {
    chai.request(app)
      .post(`${baseUrl}/recipes`)
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
  describe('Favorite', () => {
    beforeEach((done) => {
      chai.request(app)
        .post(`${baseUrl}/recipes`)
        .set('x-token', token)
        .send(fakeData.recipe1)
        .end(() => {
          done();
        });
    });
    it('should return 201 when a recipe is favorited', (done) => {
      chai.request(app)
        .post(`${baseUrl}/recipe/1/favorite`)
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message').equal('Recipe favorited');
          done();
        });
    });
    it('should return a list of favorited recipes', (done) => {
      chai.request(app)
        .get(`${baseUrl}/user/1/favorites`)
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
