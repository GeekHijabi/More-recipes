import chai from 'chai';
import chaiHttp from 'chai-http';


import fakeData from './faker';
import app from '../app';
import db from '../models';

const should = chai.Should();
chai.use(chaiHttp);

let token;

describe('Recipes', () => {
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
  // afterEach(() => db.User.truncate())
  it('should let user add a recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-token', token)
      .send(fakeData.recipe1)
      .end((err, res) => {
        console.log('res', res.body);
        if (err) {
          return done(err);
        }
        res.should.have.status(201);
        res.body.should.have.property('recipeName');
        done();
      });
  });
  describe('rolls eyes', () => {
    beforeEach((done) => {
      chai.request(app).post('/api/v1/recipes')
        .set('x-token', token)
        .send(fakeData.recipe1)
        .end(() => {
          done();
        });
    });
    it('should let user add same recipe twice', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('x-token', token)
        .send(fakeData.recipe1)
        .end((err, res) => {
          res.should.have.status(409);
          done();
        });
    });
    it('should let user delete a recipe', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/1')
        .set('x-token', token)
        .end((err, res) => {
          res.body.should.have.property('message')
            .equal('Recipe deleted successfully');
          res.should.have.status(200);
          done();
        });
    });
    it('should let user edit a recipe', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/1')
        .send(fakeData.recipe2)
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('should check if the recipe is available for editing', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/2')
        .set('x-token', token)
        .send(fakeData.recipe2)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error').equal('Recipe not found');
          done();
        });
    });
  });

  it('should not let unverified user create recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .send(fakeData.recipe1)
      .set('x-token', 'Awkdfnsmejfgnfdjfgrew')
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        done();
      });
  });
  it('should get all recipe', (done) => {
    chai.request(app)
      .get('/api/v1/recipes?page=1&limit=8')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('Object');
        done();
      });
  });
});
