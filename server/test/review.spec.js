import chai from 'chai';
import chaiHttp from 'chai-http';


import fakeData from './faker';
import app from '../app';
import db from '../models';

const should = chai.Should();
chai.use(chaiHttp);

it('should not let unauthorized user review a recipe', (done) => {
  chai.request(app)
    .post('/api/v1/recipes/:recipeId/review')
    .end((err, res) => {
      res.body.should.have.property('error').equal('Unauthorised User!');
      res.should.have.status(401);
      done();
    });
});
it('should not let unauthorized user get a review', (done) => {
  chai.request(app)
    .get('/api/v1/recipe/:recipeId/review')
    .end((err, res) => {
      res.body.should.have.property('error').equal('Unauthorised User!');
      res.should.have.status(401);
      done();
    });
});
it('should not let unauthorized user delete a review', (done) => {
  chai.request(app)
    .delete('/api/v1/recipe/:id/review')
    .end((err, res) => {
      res.body.should.have.property('error').equal('Unauthorised User!');
      res.should.have.status(401);
      done();
    });
});

