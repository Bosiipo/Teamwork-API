// import chai from 'chai';
// import 'chai/register-should';
// import chaiHttp from 'chai-http';
// import app from '../app';

// chai.use(chaiHttp);

// describe('Admin', () => {
//   beforeEach(done => {
//     done();
//   });

//   describe('POST /auth/admin/signup', () => {
//     it('should not POST an admin without an email field', done => {
//       const newAdmin = {
//         firstname: 'Charles',
//         lastname: 'Donder',
//         password: 'password',
//         isAdmin: 'false'
//       };
//       chai
//         .request(app)
//         .post('/api/v1/auth/admin/register')
//         .send(newAdmin)
//         .end((err, res) => {
//           res.should.have.status(500);
//           res.body.should.be.a('object');
//           res.body.should.have.property('status').eql('error');
//           res.body.should.have.property('message');
//           done();
//         });
//     });

//     it('should not POST an admin without a password field', done => {
//       const newAdmin = {
//         firstname: 'Charles',
//         lastname: 'Donder',
//         isAdmin: 'false'
//       };
//       chai
//         .request(app)
//         .post('/api/v1/auth/admin/register')
//         .send(newAdmin)
//         .end((err, res) => {
//           res.should.have.status(500);
//           res.body.should.be.a('object');
//           res.body.should.have.property('status').eql('error');
//           res.body.should.have.property('message');
//           done();
//         });
//     });

//     it('should create a new admin', done => {
//       const newAdmin = {
//         firstname: 'Michael',
//         lastname: 'Gabriel',
//         email: 'yuletide@gmail.com',
//         password: 'passord',
//         isAdmin: 'false'
//       };
//       chai
//         .request(app)
//         .post('/api/v1/auth/admin/register')
//         .send(newAdmin)
//         .end((err, res) => {
//           res.should.have.status(201);
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').eql('Admin Registered');
//           res.body.should.have.property('status').eql('success');
//           res.body.should.have.property('token');
//           done();
//         });
//     });
//   });
//   // test the post /auth/login/ route
//   describe('POST /auth/admin/login', () => {
//     it('it should throw an error if username is not provided', done => {
//       const loginCredentials = {
//         password: 'password'
//       };
//       chai
//         .request(app)
//         .post('/api/v1/auth/admin/login')
//         .send(loginCredentials)
//         .end((err, res) => {
//           res.should.have.status(500);
//           res.body.should.be.a('object');
//           res.body.should.have.property('status').eql('error');
//           res.body.should.have.property('message');
//           done();
//         });
//     });

//     it('it should throw an error if password is not provided', done => {
//       const loginCredentials = {
//         username: 'chally'
//       };
//       chai
//         .request(app)
//         .post('/api/v1/auth/admin/login')
//         .send(loginCredentials)
//         .end((err, res) => {
//           res.should.have.status(500);
//           res.body.should.be.a('object');
//           res.body.should.have.property('status').eql('error');
//           res.body.should.have.property('message');
//           done();
//         });
//     });

//     it('it should throw an error if user supply wrong username', done => {
//       const loginCredentials = {
//         username: 'Shallyyyy',
//         password: 'password'
//       };
//       chai
//         .request(app)
//         .post('/api/v1/auth/admin/login')
//         .send(loginCredentials)
//         .end((err, res) => {
//           res.should.have.status(500);
//           res.body.should.be.a('object');
//           res.body.should.have.property('status').eql('error');
//           res.body.should.have.property('message');
//           done();
//         });
//     });

//     it('it should throw an error if user supply a wrong username and password combination ', done => {
//       const loginCredentials = {
//         username: 'Shallyyyy',
//         password: 'passwordyyy'
//       };
//       chai
//         .request(app)
//         .post('/api/v1/auth/admin/login')
//         .send(loginCredentials)
//         .end((err, res) => {
//           res.should.have.status(500);
//           res.body.should.be.a('object');
//           res.body.should.have.property('status').eql('error');
//           res.body.should.have.property('message');
//           done();
//         });
//     });

//     it('should log the user in', done => {
//       const loginCredentials = {
//         email: 'chally@yahoo.com',
//         password: 'password'
//       };
//       chai
//         .request(app)
//         .post('/api/v1/auth/admin/login')
//         .send(loginCredentials)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.should.have.property('status').to.eql('success');
//           res.body.should.have.property('message').to.eql('Admin Logged In');
//           res.body.should.have.property('token');
//           done();
//         });
//     });
//   });
// });
