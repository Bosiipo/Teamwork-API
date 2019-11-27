"use strict";

var _chai = _interopRequireDefault(require("chai"));

require("chai/register-should");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

describe('Admin', function () {
  var generatedToken = null;
  before('Login admin to obtain auth token to be used in other operations', function (done) {
    var adminCredentials = {
      email: 'femiajayi@gmail.com',
      password: 'femiajayi'
    };

    _chai["default"].request(_app["default"]).post('/api/v1/auth/admin/login').send(adminCredentials).end(function (err, res) {
      res.should.have.status(200);

      if (!err) {
        generatedToken = res.body.token;
      }

      done();
    });
  }); //   it('should create new Admin', done => {
  //     const newAdmin = {
  //       firstname: 'Martins',
  //       lastname: 'Ajayi',
  //       email: 'martinsjayi@gmail.com',
  //       password: 'martinsajayi'
  //     };
  //     chai
  //       .request(app)
  //       .post('/api/v1/auth/admin/register')
  //       .send(newAdmin)
  //       .end((err, res) => {
  //         res.should.have.status(201);
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('message').eql('Admin Registered');
  //         res.body.should.have.property('status').eql('success');
  //         res.body.should.have.property('token');
  //         done();
  //       });
  //   });
  //   it('should create a new employee', done => {
  //     const newEmployee = {
  //       firstname: 'Badguy',
  //       lastname: 'Tizzle',
  //       email: 'mother@gmail.com',
  //       password: 'password',
  //       gender: 'male',
  //       jobRole: 'Architect',
  //       department: 'Surveying',
  //       address: '28, shiaba street Agege, Lagos.'
  //     };
  //     chai
  //       .request(app)
  //       .post('/api/v1/auth/admin/create-user')
  //       .send(newEmployee)
  //       .set('authentication', generatedToken)
  //       .end((err, res) => {
  //         res.should.have.status(201);
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('message').eql('Employee Registered');
  //         res.body.should.have.property('status').eql('success');
  //         res.body.should.have.property('token');
  //         done();
  //       });
  //   });

  it('should not create an admin if email already exists', function (done) {
    var newAdmin = {
      firstname: 'Sean',
      lastname: 'Mica',
      email: 'martinsajayi@gmail.com',
      password: 'ole'
    };

    _chai["default"].request(_app["default"]).post('/api/v1/auth/admin').send(newAdmin).end(function (err, res) {
      res.should.have.status(404);
      res.body.should.be.a('object'); // res.body.should.have.property('message').eql('Incorrect parameters');
      // res.body.should.have.property('status').eql('error');

      done();
    });
  });
  it('should not create an admin without a password field', function (done) {
    var newAdmin = {
      firstname: 'Seannn',
      lastname: 'Micarian',
      email: 'marti@gmail.com'
    };

    _chai["default"].request(_app["default"]).post('/api/v1/auth/admin').send(newAdmin).end(function (err, res) {
      res.should.have.status(404);
      res.body.should.be.a('object'); // res.body.should.have.property('message').eql('Incorrect parameters');
      // res.body.should.have.property('status').eql('error');

      done();
    });
  });
});