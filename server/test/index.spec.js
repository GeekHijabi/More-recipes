import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

chai.should();
chai.use(chaiHttp);

describe('More Recipes', () => {
  it('should get the home page', (done) => {
    chai
      .request(app)
      .get('/api/v1')
      .end((err, res) => {
        res
          .should
          .have
          .status(200);
        done();
      });
  });
});
