import chai from 'chai';
import chaiHttp from 'chai-http';


import fakeData from './faker';
import app from '../app';
import db from '../models';

const should = chai.Should();
chai.use(chaiHttp);

const baseUrl = '/api/v1';
let token;

describe('Vote', () => {
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
  it('should add a new recipe', (done) => {
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
  describe('for votes action', () => {
    beforeEach((done) => {
      chai.request(app)
        .post(`${baseUrl}/recipes`)
        .set('x-token', token)
        .send(fakeData.recipe1)
        .end(() => {
          done();
        });
    });
    it('should return 200 when a recipe is upvoted', (done) => {
      chai.request(app)
        .post(`${baseUrl}/recipe/1/upvote`)
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').equal('Successfully upvoted');
          done();
        });
    });
    it('should remove upvote when upvote action is performed again', (done) => {
      chai.request(app)
        .post(`${baseUrl}/recipe/1/upvote`)
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should let 200 when a recipe is downvoted', (done) => {
      chai.request(app)
        .post(`${baseUrl}/recipe/1/downvote`)
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').equal('Successfully downvoted');
          done();
        });
    });
    // it('should let 200 when a recipe an downvoted recipe is added', (done) => {
    //   chai.request(app)
    //     .post(`${baseUrl}/recipe/1/downvote`)
    //     .set('x-token', token)
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.should.have.property('message').equal('downvote added');
    //       done();
    //     });
    // });
    it('should remove downvote when downvote action is performed again', (done) => {
      chai.request(app)
        .post(`${baseUrl}/recipe/1/downvote`)
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});

