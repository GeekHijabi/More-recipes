import request from 'supertest';
import chai from 'chai';
import app from '../../app';

const expect = chai.expect;

describe('More-Recipes', () => {
  it('loads the home page', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('Fails to load the home page', (done) => {
    request(app)
      .get('/home')
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('Fails to post to undeclared route', (done) => {
    request(app)
      .post('/home')
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});

// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../../app';

// const should = chai.should();
// chai.use(chaiHttp);

// describe("More Recipes", () => {
//   it('shoud get the home page', (done) => {
//     chai.request(app)
//       .get('/')
//       .end((err, res) => {
//         res.should.have.status(200)
//         done()
//       })
//   })
    
//     it('shoud return 200 for get request', (done) => {
//     chai.request(app)
//       .post('/')
//       .end((err, res) => {
//         res.should.have.status(200)
//         done()
//       })
//     })

//     it('shoud return 200 for delete request', (done) => {
//       chai.request(app)
//         .delete('/')
//         .end((err, res) => {
//           res.should.have.status(200)
//           done()
//         })
//       })

//       it('shoud return 200 for put request', (done) => {
//         chai.request(app)
//           .add('/')
//           .end((err, res) => {
//             res.should.have.status(200)
//             done()
//           })
//         })
// })