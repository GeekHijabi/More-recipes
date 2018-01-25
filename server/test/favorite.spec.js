import chai from 'chai';
import chaiHttp from 'chai-http';
import fakeData from './faker';
import app from '../app';
import db from '../models';

const should = chai.Should();
chai.use(chaiHttp);

let token;

describe('Favorites', () => {
  it('should let unauthorized user access the favorite route', (done) => {
    chai.request(app)
      .post('/api/v1/recipe/:recipeId/favorite')
      .end((err, res) => {
        res.body.should.have.property('error').equal('Unauthorised User!');
        res.should.have.status(401);
        done();
      });
  });
  it('should let unauthorized user access get favorite route', (done) => {
    chai.request(app)
      .post('/api/v1/favorites')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
