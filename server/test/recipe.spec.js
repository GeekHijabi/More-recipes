import chai from 'chai';
import chaiHttp from 'chai-http';


import fakeData from './faker';
import app from '../app';
import db from '../models';

chai.should();
chai.use(chaiHttp);

const baseUrl = '/api/v1';
let token;

describe('Recipes controller', () => {
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
  it('should create a recipe', (done) => {
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
  describe('for recipe actions', () => {
    beforeEach((done) => {
      chai.request(app)
        .post(`${baseUrl}/recipes`)
        .set('x-token', token)
        .send(fakeData.recipe1)
        .end(() => {
          done();
        });
    });
    it('should return error when user tries to add same recipe twice', (done) => {
      chai.request(app)
        .post(`${baseUrl}/recipes`)
        .set('x-token', token)
        .send(fakeData.recipe1)
        .end((err, res) => {
          res.should.have.status(409);
          done();
        });
    });
    it('should let authorized user delete a recipe', (done) => {
      chai.request(app)
        .delete(`${baseUrl}/recipes/1`)
        .set('x-token', token)
        .end((err, res) => {
          res.body.should.have.property('message')
            .equal('Recipe deleted successfully');
          res.should.have.status(200);
          done();
        });
    });
    it('should return 404 when recipe is not available', (done) => {
      chai.request(app)
        .delete(`${baseUrl}/recipes/2`)
        .set('x-token', token)
        .end((err, res) => {
          res.body.should.have.property('error')
            .equal('Recipe not found');
          res.should.have.status(404);
          done();
        });
    });
    it('should let authorized user edit a recipe', (done) => {
      chai.request(app)
        .patch(`${baseUrl}/recipes/1`)
        .send(fakeData.recipe2)
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('should return 404 if no recipe is available', (done) => {
      chai.request(app)
        .patch(`${baseUrl}/recipes/2`)
        .set('x-token', token)
        .send(fakeData.recipe2)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error').equal('Recipe not found');
          done();
        });
    });
    it('should return the favorited recipes of an authorized user', (done) => {
      chai.request(app)
        .get(`${baseUrl}/favorites?page=1&limit=4&order=asc`)
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should return a list of recipe created by an authorized user', (done) => {
      chai.request(app)
        .get(`${baseUrl}/myrecipes?page=1&limit=4&order=asc`)
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('should return the details of a single recipe', (done) => {
      chai.request(app)
        .get(`${baseUrl}/recipe/1`)
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should return 404 when there is no recipe detail found', (done) => {
      chai.request(app)
        .get(`${baseUrl}/recipe/2`)
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  it('should not grant permission to unauthorized user to create recipe', (done) => {
    chai.request(app)
      .post(`${baseUrl}/recipes`)
      .send(fakeData.recipe1)
      .set('x-token', 'Awkdfnsmejfgnfdjfgrew')
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        done();
      });
  });
});
it('should get a list of all recipe', (done) => {
  chai.request(app)
    .get(`${baseUrl}/recipes?page=1&limit=6&sort=createdAt&order=desc`)
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.an('Object');
      done();
    });
});
it('should return the search result of a recipe', (done) => {
  chai.request(app)
    .get(`${baseUrl}/search?page=1`)
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.an('Object');
      done();
    });
});
