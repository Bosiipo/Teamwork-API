"use strict";

var _chai = _interopRequireDefault(require("chai"));

require("chai/register-should");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]); // Run before each test


describe('Article', function () {
  var generatedToken = null;
  var employeeToken = null; // Login employee to generate employeeToken before test

  before('Login admin to obtain auth token to be used in other operations', function (done) {
    var adminCredentials = {
      email: 'bosipo@gmail.com',
      password: 'seaven'
    };

    _chai["default"].request(_app["default"]).post('/api/v1/auth/admin/login').send(adminCredentials).end(function (err, res) {
      res.should.have.status(200);

      if (!err) {
        generatedToken = res.body.token;
      }

      done();
    });
  });
  before('Login employee to obtain auth token to be used in other operations', function (done) {
    var employeeCredentials = {
      email: 'tosin@gmail.com',
      password: 'tosin'
    };

    _chai["default"].request(_app["default"]).post('/api/v1/auth/employee/login').send(employeeCredentials).end(function (err, res) {
      res.should.have.status(200);

      if (!err) {
        employeeToken = res.body.token;
      }

      done();
    });
  }); // Test the POST /article/ route

  describe('POST /article', function () {
    it('should not post an article without an article field', function (done) {
      var article = {
        title: 'Yup',
        employeeId: 4
      };

      _chai["default"].request(_app["default"]).post('/api/v1/articles').send(article).set('authorization', employeeToken).end(function (err, res) {
        res.should.have.property('status', 500);
        res.body.should.be.a('object');
        done();
      });
    });
    it('it should post an article', function (done) {
      var article = {
        title: 'Yeah!',
        article: 'Aint this something'
      };

      _chai["default"].request(_app["default"]).post('/api/v1/articles').send(article).set('authorization', employeeToken).end(function (err, res) {
        res.should.have.property('status', 200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('title');
        res.body.data.should.have.property('articleId');
        res.body.data.should.have.property('message');
        done();
      });
    });
  });
  describe('GET /articles/:id', function () {
    it('should get an article by the given id', function (done) {
      var articleId = 3;

      _chai["default"].request(_app["default"]).get("/api/v1/articles/".concat(articleId)).set('authorization', employeeToken).end(function (err, res) {
        res.should.have.property('status', 200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.data.should.have.property('article');
        done();
      });
    });
    it('should throw an error when a number is not passed as id', function (done) {
      var articleId = 'o';

      _chai["default"].request(_app["default"]).get("/api/v1/articles/".concat(articleId)).set('authorization', employeeToken).end(function (err, res) {
        res.should.have.property('status', 500); //   res.body.should.have.be.a('object');

        done();
      });
    });
  });
  describe('PUT /articles/:id', function () {//   it('should update an article given the id', done => {
    //     const articleId = 9;
    //     const updateArticle = {
    //       id: articleId,
    //       title: 'YES!',
    //       article: 'This is it!',
    //       employeeId: 4
    //     };
    //     chai
    //       .request(app)
    //       .put(`/api/v1/articles/${articleId}`)
    //       .send(updateArticle)
    //       .set('authorization', employeeToken)
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         res.body.should.be.a('object');
    //         res.body.data.should.have
    //           .property('message')
    //           .eql('Article successfully updated!');
    //         done();
    //       });
    //   });
    //   it('should throw an error when a number is not passed as id', done => {
    //     const articleId = 3;
    //     const updateArticle = {
    //       id: 'o',
    //       title: 'Hush the fuc',
    //       article: 'This is it!',
    //       employeeId: 4
    //     };
    //     chai
    //       .request(app)
    //       .put(`/api/v1/articles/${articleId}`)
    //       .send(updateArticle)
    //       .set('authorization', employeeToken)
    //       .end((err, res) => {
    //         res.should.have.property('status', 500);
    //         res.body.should.have.be.a('object');
    //         res.body.should.have.property('message').eql('You cannot do that!');
    //         done();
    //       });
    //   });
    // });
    // describe('Delete /articles/:id', () => {
    //   it('should delete an article with id', done => {
    //     const articleId = 9;
    //     chai
    //       .request(app)
    //       .delete(`/api/v1/articles/${articleId}`)
    //       .set('authorization', employeeToken)
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         res.body.should.be.a('object');
    //         res.body.should.have.property('status').eql('success');
    //         done();
    //       });
    //   });
  });
  describe('DELETE /articles/:id', function () {
    it('should not delete if Id is null', function (done) {
      var articleId = 'o';

      _chai["default"].request(_app["default"])["delete"]("/api/v1/articles/".concat(articleId)).set('authorization', employeeToken).end(function (err, res) {
        res.should.have.status(500);
        res.body.should.be.a('object');
        done();
      });
    });
  });
});