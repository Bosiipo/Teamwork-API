"use strict";

var _chai = _interopRequireDefault(require("chai"));

require("chai/register-should");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]); // Runs before each test


describe('Employee', function () {
  beforeEach(function (done) {
    done();
  }); // Test the post /api/v1/auth/employee

  describe('POST /api/v1/auth/employee/login', function () {
    it('should not POST employee without email field', function (done) {
      var newEmployee = {
        firstname: 'Charles',
        lastname: 'Donder',
        password: 'password'
      };

      _chai["default"].request(_app["default"]).post('/api/v1/auth/employee/login').send(newEmployee).end(function (err, res) {
        res.should.have.status(500);
        res.body.should.be.a('object'); //   res.body.should.have.property('status').eql('error');

        res.body.should.have.property('message');
        done();
      });
    });
    it('should not POST an employee without password field', function (done) {
      var newEmployee = {
        firstname: 'Charles',
        lastname: 'Donder',
        email: 'chally@gmail.com'
      };

      _chai["default"].request(_app["default"]).post('/api/v1/auth/employee/login').send(newEmployee).end(function (err, res) {
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
    }); // it('should not POST an employee if the email already exists in the system', done => {
    //   const newEmployee = {
    //     firstname: 'Charles',
    //     lastname: 'Donder',
    //     email: 'tosin@gmail.com',
    //     password: 'password'
    //   };
    //   chai
    //     .request(app)
    //     .post('/api/v1/auth/employee/register')
    //     .send(newEmployee)
    //     .end((err, res) => {
    //       res.should.have.status(500);
    //       res.body.should.be.a('object');
    //       res.body.should.have.property('status').eql('error');
    //       res.body.should.have.property('message');
    //       done();
    //     });
    // });
  }); // test the post /auth/login/ route
  // describe('POST /auth/login', () => {
  // it('it should throw an error if email is not provided', done => {
  //   const loginCredentials = {
  //     password: 'password'
  //   };
  //   chai
  //     .request(app)
  //     .post('/api/v1/auth/user/login')
  //     .send(loginCredentials)
  //     .end((err, res) => {
  //       res.should.have.status(500);
  //       res.body.should.be.a('object');
  //       res.body.should.have.property('status').eql('error');
  //       res.body.should.have.property('message');
  //       done();
  //     });
  // });
  // it('it should throw an error if password is not provided', done => {
  //   const loginCredentials = {
  //     email: 'chally'
  //   };
  //   chai
  //     .request(app)
  //     .post('/api/v1/auth/user/login')
  //     .send(loginCredentials)
  //     .end((err, res) => {
  //       res.should.have.status(500);
  //       res.body.should.be.a('object');
  //       res.body.should.have.property('status').eql('error');
  //       res.body.should.have.property('message');
  //       done();
  //     });
  // });
  // it('should throw an error if employee supplies wrong email', done => {
  //   const loginCredentials = {
  //     email: 'Shallyyyy@gmail.com',
  //     password: 'password'
  //   };
  //   chai
  //     .request(app)
  //     .post('/api/v1/auth/employee/login')
  //     .send(loginCredentials)
  //     .end((err, res) => {
  //       res.should.have.status(500);
  //       res.body.should.be.a('object');
  //       res.body.should.have.property('status').eql('error');
  //       res.body.should.have.property('message');
  //       done();
  //     });
  // });
  // it('it should throw an error if user supply a wrong email and password combination ', done => {
  //   const loginCredentials = {
  //     email: 'Shallyyyy',
  //     password: 'passwordyyy'
  //   };
  //   chai
  //     .request(app)
  //     .post('/api/v1/auth/employee/login')
  //     .send(loginCredentials)
  //     .end((err, res) => {
  //       res.should.have.status(500);
  //       res.body.should.be.a('object');
  //       res.body.should.have.property('status').eql('error');
  //       res.body.should.have.property('message');
  //       done();
  //     });
  // });
  // it('should login the user in', done => {
  //   const loginCredentials = {
  //     email: 'chally',
  //     password: 'password'
  //   };
  //   chai
  //     .request(app)
  //     .post('/api/v1/auth/employee/login')
  //     .send(loginCredentials)
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       res.body.should.be.a('object');
  //       res.body.should.have.property('status').eql('success');
  //       res.body.should.have.property('message');
  //       res.body.should.have.property('token');
  //       done();
  //     });
  // });
  // });
});