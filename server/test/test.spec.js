import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const should = chai.Should();
chai.use(chaiHttp);

describe('More Recipes', () => {
  it('should get the home page', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return 200 for get request', (done) => {
    chai.request(app)
      .post('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return 200 for delete request', (done) => {
    chai.request(app)
      .delete('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return 200 for put request', (done) => {
    chai.request(app)
      .add('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
