import chai from 'chai';
import chaiHttp from 'chai-http';


import fakeData from './faker';
import app from '../app';
import db from '../models';

chai.should();
chai.use(chaiHttp);

let token;

describe('Reviews', () => {
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
  describe('Review', () => {
    beforeEach((done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('x-token', token)
        .send(fakeData.recipe1)
        .end(() => {
          done();
        });
    });
    it('should let user add a review', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/review')
        .set('x-token', token)
        .send(fakeData.reviews)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').equal('Your recipe has been reviewed');
          done();
        });
    });
    it('should get single review', (done) => {
      chai.request(app)
        .get('/api/v1/recipe/1/review')
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    // it('should get single review', (done) => {
    //   chai.request(app)
    //     .get('/api/v1/recipe/3/review')
    //     .set('x-token', token)
    //     .end((err, res) => {
    //       res.should.have.status(404);
    //       done();
    //     });
    // });
    it('should return 404 for review to recipe not found', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/2/review')
        .set('x-token', token)
        .send(fakeData.reviews)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it('should return 404 for review not found', (done) => {
      chai.request(app)
        .delete('/api/v1/recipe/1/review')
        .set('x-token', token)
        .end((err, res) => {
          res.body.should.have.property('error')
            .equal('Review not found');
          res.should.have.status(404);
          done();
        });
    });
    // beforeEach((done) => {
    //   chai.request(app)
    //     .post('/api/v1/recipes/3/review')
    //     .set('x-token', token)
    //     .send(fakeData.reviews2)
    //     .end(() => {
    //       done();
    //     });
    // });
    // it('should return 404 for review not found', (done) => {
    //   chai.request(app)
    //     .delete('/api/v1/recipe/3/review')
    //     .set('x-token', token)
    //     .end((err, res) => {
    //     // res.body.should.have.property('error')
    //     //   .equal('Review not found');
    //       res.should.have.status(200);
    //       done();
    //     });
    // });
  });
});
