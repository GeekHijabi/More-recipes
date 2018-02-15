import chai from 'chai';
import chaiHttp from 'chai-http';
import fakeData from './faker';
import app from '../app';
import db from '../models';

chai.should();
chai.use(chaiHttp);

const baseUrl = '/api/v1';
let token;


describe('User controller', () => {
  before((done) => {
    chai.request(app).post(`${baseUrl}/user/signup`)
      .send(fakeData.newUser)
      .end((err, res) => {
        res.should.have.status(201);
        chai.request(app)
          .post(`${baseUrl}/user/signin`)
          .send(fakeData.signedInUser2)
          .end((err, res) => {
            res.body.should.be.a('object');
            res.body.should.have.property('message')
              .equal('You have successfully signed in!');
            res.should.be.a('object');
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
    chai.request(app).post(`${baseUrl}/user/signup`)
      .send(fakeData.signupUser)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('should not create user with details that already exists', (done) => {
    chai.request(app).post(`${baseUrl}/user/signup`)
      .send(fakeData.newUser)
      .end((err, res) => {
        res.body.should.have
          .property('error')
          .equal('User already exists');
        done();
      });
  });
  it('should not create user with invalid Email', (done) => {
    chai
      .request(app)
      .post(`${baseUrl}/user/signup`)
      .send(fakeData.noEmailInput)
      .end((err, res) => {
        res
          .should
          .have
          .status(422);
        res.body.should.have
          .property('error')
          .equal('Please supply valid email address');
        done();
      });
  });
  it('should check if password is supplied', (done) => {
    chai.request(app).post(`${baseUrl}/user/signup`)
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
    chai.request(app).post(`${baseUrl}/user/signup`)
      .send(fakeData.lenPasswordShort)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.have
          .property('error')
          .equal('password must be 8 characters or more');
        done();
      });
  });

  it('should not grant access to unregistered user', (done) => {
    chai
      .request(app)
      .post(`${baseUrl}/user/signin`)
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
      .post(`${baseUrl}/user/signin`)
      .send(fakeData.noPasswordInput)
      .end((err, res) => {
        res.body.should.have.property('error')
          .equal('Password is required');
        done();
      });
  });
  it('should sign in user with correct access information', (done) => {
    chai.request(app)
      .post(`${baseUrl}/user/signin`)
      .send(fakeData.signedInUser2)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message')
          .equal('You have successfully signed in!');
        done();
      });
  });
  it(
    'should check that email/username and password combination matches',
    (done) => {
      chai.request(app)
        .post(`${baseUrl}/user/signin`)
        .send(fakeData.signedInUser3)
        .end((err, res) => {
          token = { token };
          res.body.should.be.a('object');
          res.body.should.have.property('error')
            .equal('Email/Username and password mismatch');
          done();
        });
    }
  );
  it('should check that correct email or username is supplied', (done) => {
    chai.request(app)
      .post(`${baseUrl}/user/signin`)
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
  it('should check that username is up to 6 characters', (done) => {
    chai.request(app)
      .post(`${baseUrl}/user/signup`)
      .send(fakeData.userNameLess)
      .end((err, res) => {
        token = { token };
        res.body.should.be.a('object');
        res.should.have.status(422);
        res.body.should.have.property('error')
          .equal('Please provide a valid username with atleast 6 characters.');
        done();
      });
  });
  it('should not allow unauthorized user to get user details', (done) => {
    chai.request(app)
      .get(`${baseUrl}/user/:userId`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.should.have.status(401);
        done();
      });
  });

  describe('for Authorized user', () => {
    before((done) => {
      chai.request(app).post(`${baseUrl}/user/signin`)
        .send(fakeData.signedInUser2)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });
    it('should allow user profile update', (done) => {
      chai.request(app)
        .patch(`${baseUrl}/user/:userId`)
        .send(fakeData.updateProfile)
        .set('x-token', token)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.should.have.status(200);
          done();
        });
    });
  });
  it(
    'should not grant permission to unauthorized user to view other\'s profile',
    (done) => {
      chai.request(app)
        .patch(`${baseUrl}/user/:userId`)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.should.have.status(401);
          done();
        });
    }
  );
  it(
    'should allow user reset their password through email',
    (done) => {
      chai.request(app)
        .post(`${baseUrl}/forgot-password`)
        .send(fakeData.emailReset)
        .end((err, res) => {
          // res.body.should.be.a('object');
          res.should.have.status(200);
        });
      done();
    }
  );
});
