import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import models from './models';

const should = chai.Should();
chai.use(chaiHttp);

describe('More Recipes', () => {
  it('should get the home page', (done) => {
    chai.request(app)
      .get('/api')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return 200 for get request', (done) => {
    chai.request(app)
      .post('/api/recipes')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return 200 for delete request', (done) => {
    chai.request(app)
      .delete('/api/recipes')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return 200 for put request', (done) => {
    chai.request(app)
      .add('/api/recipes')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
