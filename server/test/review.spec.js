import chai from 'chai';
import chaiHttp from 'chai-http';


import fakeData from './faker';
import app from '../app';
import db from '../models';

chai.should();
chai.use(chaiHttp);

const baseUrl = '/api/v1';
let token;

describe('Reviews controller', () => {
  beforeEach((done) => {
    chai.request(app).post(`${baseUrl}/user/signup`)
      .send(fakeData.newUser)
      .end((err, res) => {
        res.should.have.status(201);
        chai.request(app)
          .post(`${baseUrl}/user/signin`)
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
  describe('for review actions', () => {
    beforeEach((done) => {
      chai.request(app)
        .post(`${baseUrl}/recipes`)
        .set('x-token', token)
        .send(fakeData.recipe1)
        .end(() => {
          done();
        });
    });
    it('should return 200 when a user reviews a recipe', (done) => {
      chai.request(app)
        .post(`${baseUrl}/recipes/1/review`)
        .set('x-token', token)
        .send(fakeData.reviews)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message')
            .equal('Your recipe has been reviewed');
          done();
        });
    });
    it('should return 422 when a user enters empty review dats', (done) => {
      chai.request(app)
        .post(`${baseUrl}/recipes/1/review`)
        .set('x-token', token)
        .send(fakeData.reviews2)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.have.property('error')
            .equal('review cannot be empty');
          done();
        });
    });
    it('should return the data of a single review', (done) => {
      chai.request(app)
        .get(`${baseUrl}/recipe/1/review`)
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should return 404 for review to an unavailable recipe', (done) => {
      chai.request(app)
        .post(`${baseUrl}/recipes/2/review`)
        .set('x-token', token)
        .send(fakeData.reviews)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it('should return 404 for attempting to delete an unexisting review', (done) => {
      chai.request(app)
        .delete(`${baseUrl}/recipe/1/review`)
        .set('x-token', token)
        .end((err, res) => {
          res.body.should.have.property('error')
            .equal('Review not found');
          res.should.have.status(404);
          done();
        });
    });
  });
});
