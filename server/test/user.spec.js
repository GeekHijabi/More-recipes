import chai from 'chai';
import chaiHttp from 'chai-http';
import fakeData from './faker';
import app from '../app';
import db from '../models';

chai.should();
chai.use(chaiHttp);

let token;

describe('User', () => {
  before((done) => {
    chai.request(app).post('/api/v1/user/signup')
      .send(fakeData.newUser)
      .end((err, res) => {
        res.should.have.status(201);
        chai.request(app)
          .post('/api/v1/user/signin')
          .send(fakeData.signedInUser2)
          .end((err, res) => {
            res.body.should.be.a('object');
            res.body.should.have.property('message')
              .equal('You have successfully signed in!');
            done();
          });
      });
  });
  after(() => db.User.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
  }));
  it('should create a new User', (done) => {
    chai.request(app).post('/api/v1/user/signup')
      .send(fakeData.signupUser)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('should not create user with details that exists already', (done) => {
    chai.request(app).post('/api/v1/user/signup')
      .send(fakeData.newUser)
      .end((err, res) => {
        res.body.should.have
          .property('error')
          .equal('User already exists');
        done();
      });
  });
  it('should create object response for user signup', (done) => {
    chai.request(app).post('/api/v1/user/signup')
      .send(fakeData.newUser)
      .end((err, res) => {
        res.should.be.a('object');
        done();
      });
  });
  it('should not create User with invalid email', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/signup')
      .send(fakeData.noEmailInput)
      .end((err, res) => {
        res
          .should
          .have
          .status(422);
        done();
      });
  });
  it('should check if email address is supplied', (done) => {
    chai.request(app).post('/api/v1/user/signup')
      .send(fakeData.noEmailInput)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.have
          .property('error')
          .equal('Please supply valid email address');
        done();
      });
  });
  it('should check if password is supplied', (done) => {
    chai.request(app).post('/api/v1/user/signup')
      .send(fakeData.noPasswordSignupInput)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.have
          .property('error')
          .equal('password cannot be empty');
        done();
      });
  });
  it('should check if password is less than 8 characters', (done) => {
    chai.request(app).post('/api/v1/user/signup')
      .send(fakeData.lenPasswordShort)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.have
          .property('error')
          .equal('password must be 8 characters or more');
        done();
      });
  });

  // it('should not create same user twice', (done) => {
  //   chai
  //     .request(app)
  //     .post('/api/v1/user/signup')
  //     .send(fakeData.newUser)
  //     .end((err, res) => {
  //       res.should.have.status(409);
  //       res.body.should.have
  //         .property('error')
  //         .equal('User already exists');
  //       done();
  //     });
  // });
  it('should not allow unregistered sign in', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/signin')
      .send(fakeData.newUser2)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error')
          .equal('Email/Username and password mismatch');
        done();
      });
  });

  it('should not let user sign in without password ', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/signin')
      .send(fakeData.noPasswordInput)
      .end((err, res) => {
        res.body.should.have.property('error')
          .equal('Password is required');
        done();
      });
  });
  it('should let user sign in', (done) => {
    chai.request(app)
      .post('/api/v1/user/signin')
      .send(fakeData.signedInUser2)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message')
          .equal('You have successfully signed in!');
        done();
      });
  });
  it('should check that email/username and password match', (done) => {
    chai.request(app)
      .post('/api/v1/user/signin')
      .send(fakeData.signedInUser3)
      .end((err, res) => {
        token = { token };
        res.body.should.be.a('object');
        res.body.should.have.property('error')
          .equal('Email/Username and password mismatch');
        done();
      });
  });
  it('should check that correct email/username is supplied', (done) => {
    chai.request(app)
      .post('/api/v1/user/signin')
      .send(fakeData.signedInUser4)
      .end((err, res) => {
        token = { token };
        res.body.should.be.a('object');
        res.should.have.status(422);
        res.body.should.have.property('error')
          .equal('Invalid credentials');
        done();
      });
  });
  it('should not allow unauthorized user to current user details', (done) => {
    chai.request(app)
      .get('/api/v1/user/:userId')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.should.have.status(401);
        done();
      });
  });

  describe('', () => {
    before((done) => {
      chai.request(app).post('/api/v1/user/signin')
        .send(fakeData.signedInUser2)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });
    it('should not allow unauthorized user to current user details', (done) => {
      chai.request(app)
        .get('/api/v1/user/1')
        .set('x-token', token)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.should.have.status(200);
          done();
        });
    });
    it('should be able to update profile', (done) => {
      chai.request(app)
        .patch('/api/v1/user/1')
        .send(fakeData.updateProfile)
        .set('x-token', token)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.should.have.status(200);
          done();
        });
    });
  });
  it('should not allow unauthorized user to view profile', (done) => {
    chai.request(app)
      .patch('/api/v1/user/:userId')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.should.have.status(401);
        done();
      });
  });
});
