import chai from 'chai';
import chaiHttp from 'chai-http';


import fakeData from './faker';
import app from '../app';
import db from '../models';

// const should = chai.Should();
chai.should();
chai.use(chaiHttp);

let token;

describe('Favorite', () => {
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
  describe('Favorite', () => {
    beforeEach((done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('x-token', token)
        .send(fakeData.recipe1)
        .end(() => {
          done();
        });
    });
    it('should let user add a recipe has favorite', (done) => {
      chai.request(app)
        .post('/api/v1/recipe/1/favorite')
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message').equal('Recipe favorited');
          done();
        });
    });
    // it('should let user remove a recipe from favorite', (done) => {
    //   chai.request(app)
    //     .post('/api/v1/recipe/1/favorite')
    //     .set('x-token', token)
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.should.have.property('message').equal('Recipe unfavorited');
    //       done();
    //     });
    // });
    it('should get favorite list', (done) => {
      chai.request(app)
        .get('/api/v1/user/1/favorites')
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    // it.only('should return 404 for no favorite', (done) => {
    //   chai.request(app)
    //     .get('/api/v1/user/5/favorites')
    //     .set('x-token', token)
    //     .end((err, res) => {
    //       res.should.have.status(404);
    //       done();
    //     });
    // });
  });
});
