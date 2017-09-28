import chai from 'chai';
import chaiHttp from 'chai-http';
//import db from '../src/models';
import app from '../src/app';

const should = chai.should();
chai.use(chaiHttp);

describe("More Recipes", () => {
  it('shoud get the home page', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })
    
    it('shoud return 404 for undefined page', (done) => {
    chai.request(app)
      .get('/xox')
      .end((err, res) => {
        res.should.have.status(404)
        done()
      })
    })
})