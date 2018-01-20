// import chai from 'chai';
// import chaiHttp from 'chai-http';


// import fakeData from './faker';
// import app from '../app';
// import db from '../models';

// const should = chai.Should();
// chai.use(chaiHttp);


// describe('Votes', () => {
//   it('should not let unauthenticated user upvote a recipe', (done) => {
//     chai.request(app)
//       .post('/api/v1/recipe/:recipeId/upvote')
//       .end((err, res) => {
//         res.body.should.have.property('error').equal('Unauthorised User!');
//         done();
//       });
//   });
//   it('should not let unauthenticated user downvote a recipe', (done) => {
//     chai.request(app)
//       .post('/api/v1/recipe/:recipeId/downvote')
//       .end((err, res) => {
//         res.body.should.have.property('error').equal('Unauthorised User!');
//         done();
//       });
//   });
//   it('should not let user with un-verified Token upvote a recipe', (done) => {
//     chai.request(app)
//       .post('/api/v1/recipe/:recipeId/upvote')
//       .send(fakeData.recipe1)
//       .set('x-token', 'Awkdfnsmejfgnfdjfgrew')
//       .end((err, res) => {
//         res.should.have.status(403);
//         res.body.should.have.property('error')
//           .equal('Token could not be authenticated');
//         done();
//       });
//   });
//   it('should not let user with un-verified Token downvote a recipe', (done) => {
//     chai.request(app)
//       .post('/api/v1/recipe/:recipeId/downvote')
//       .send(fakeData.recipe1)
//       .set('x-token', 'Awkdfnsmejfgnfdjfgrew')
//       .end((err, res) => {
//         res.should.have.status(403);
//         res.body.should.have.property('error')
//           .equal('Token could not be authenticated');
//         done();
//       });
//   });
// });
