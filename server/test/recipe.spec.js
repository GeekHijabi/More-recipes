import chai from 'chai';
import chaiHttp from 'chai-http';


import fakeData from './faker';
import app from '../app';
import db from '../models';

const should = chai.Should();
chai.use(chaiHttp);

let token;

describe('Recipes', () => {
  it('should not let unauthorized user add a recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .end((err, res) => {
        res.body.should.have.property('error').equal('Unauthorised User!');
        done();
      });
  });
  it('should not let unauthorized user delete a recipe', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/:recipeId')
      .end((err, res) => {
        res.body.should.have.property('error').equal('Unauthorised User!');
        done();
      });
  });
  it('should not let unauthorized user put a recipe', (done) => {
    chai.request(app)
      .put('/api/v1/recipes/:recipeId')
      .end((err, res) => {
        res.body.should.have.property('error').equal('Unauthorised User!');
        done();
      });
  });

  it('should not let user with un-verified user create recipe', (done) => {
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
  it('should not let user with un-verified Token create new recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .send(fakeData.recipe1)
      .set('x-token', 'Awkdfnsmejfgnfdjfgrew')
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('error')
          .equal('Token could not be authenticated');
        done();
      });
  });
  it('should get all recipe', (done) => {
    chai.request(app)
      .get('/api/v1/recipes')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('Object');
        done();
      });
  });
});
