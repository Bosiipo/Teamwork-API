"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Article = _interopRequireDefault(require("../models/Article.model"));

var _Comment = _interopRequireDefault(require("../models/Comment.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ArticleController =
/*#__PURE__*/
function () {
  function ArticleController() {
    _classCallCheck(this, ArticleController);
  }

  _createClass(ArticleController, null, [{
    key: "fetchAllArticles",
    value: function fetchAllArticles(req, res) {
      var articles;
      return regeneratorRuntime.async(function fetchAllArticles$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(_Article["default"].findAll({
                where: {
                  employeeId: req.employee.id
                },
                order: [['createdAt', 'DESC']]
              }));

            case 3:
              articles = _context.sent;
              return _context.abrupt("return", res.status(200).json({
                status: 'success',
                message: 'Successfully fetched Articles!',
                data: articles
              }));

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", res.status(500).json({
                status: _context.t0,
                message: _context.t0.message
              }));

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 7]]);
    }
  }, {
    key: "createArticle",
    value: function createArticle(req, res) {
      var _req$body, title, article, employeeId, newArticle;

      return regeneratorRuntime.async(function createArticle$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$body = req.body, title = _req$body.title, article = _req$body.article;
              employeeId = req.employee.id;

              if (!(!title || !article)) {
                _context2.next = 5;
                break;
              }

              throw new Error('Incorrect Parameters!');

            case 5:
              _context2.next = 7;
              return regeneratorRuntime.awrap(_Article["default"].create({
                employeeId: employeeId,
                title: title,
                article: article
              }));

            case 7:
              newArticle = _context2.sent;
              return _context2.abrupt("return", res.status(200).json({
                status: 'success',
                data: {
                  articleId: employeeId,
                  message: 'Article successfully posted',
                  title: title,
                  id: newArticle.id
                }
              }));

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](0);
              res.status(500).json({
                error: _context2.t0,
                message: _context2.t0.message
              });

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 11]]);
    }
  }, {
    key: "editArticle",
    value: function editArticle(req, res) {
      var id, article, articleUpdate;
      return regeneratorRuntime.async(function editArticle$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              id = req.params.id;
              _context3.next = 4;
              return regeneratorRuntime.awrap(_Article["default"].findOne({
                where: {
                  id: id
                }
              }));

            case 4:
              article = _context3.sent;

              if (id) {
                _context3.next = 7;
                break;
              }

              throw new Error("Article with ".concat(id, " does not exist"));

            case 7:
              if (!(article.employeeId !== req.employee.id)) {
                _context3.next = 9;
                break;
              }

              throw new Error('You cannot do that!');

            case 9:
              // const { title, article } = req.body;
              articleUpdate = {
                title: req.body.title,
                article: req.body.article
              }; // const { title, article } = articleUpdate;

              _context3.next = 12;
              return regeneratorRuntime.awrap(_Article["default"].update({
                title: articleUpdate.title,
                article: articleUpdate.article
              }, {
                where: {
                  id: id
                }
              }));

            case 12:
              return _context3.abrupt("return", res.status(200).json({
                status: 'success',
                data: {
                  articleId: article.employeeId,
                  message: 'Article successfully updated!',
                  title: articleUpdate.id,
                  article: articleUpdate.article
                }
              }));

            case 15:
              _context3.prev = 15;
              _context3.t0 = _context3["catch"](0);
              res.status(500).json({
                error: _context3.t0,
                message: _context3.t0.message
              });

            case 18:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 15]]);
    }
  }, {
    key: "deleteArticle",
    value: function deleteArticle(req, res) {
      var id, employeeId, article;
      return regeneratorRuntime.async(function deleteArticle$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              id = req.params.id;
              employeeId = req.employee.id; // console.log(req.params.id);
              // console.log(req.employee);

              _context4.next = 5;
              return regeneratorRuntime.awrap(_Article["default"].findOne({
                where: {
                  id: id
                }
              }));

            case 5:
              article = _context4.sent;

              if (id) {
                _context4.next = 8;
                break;
              }

              throw new Error("Article with ".concat(id, " does not exist"));

            case 8:
              if (!(article.employeeId !== req.employee.id)) {
                _context4.next = 10;
                break;
              }

              throw new Error('You cannot do that!');

            case 10:
              _context4.next = 12;
              return regeneratorRuntime.awrap(_Article["default"].destroy({
                where: {
                  id: article.id
                }
              }));

            case 12:
              return _context4.abrupt("return", res.status(200).json({
                status: 'success',
                data: {
                  message: 'Article successfully deleted'
                }
              }));

            case 15:
              _context4.prev = 15;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", res.status(500).json({
                error: _context4.t0,
                message: _context4.t0.message
              }));

            case 18:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[0, 15]]);
    }
  }, {
    key: "addComment",
    value: function addComment(req, res) {
      var articleId, comment, newComment;
      return regeneratorRuntime.async(function addComment$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              articleId = req.params.id;
              comment = req.body.comment;
              _context5.next = 5;
              return regeneratorRuntime.awrap(_Comment["default"].create({
                articleId: Number(articleId),
                comment: comment
              }));

            case 5:
              newComment = _context5.sent;
              return _context5.abrupt("return", res.status(200).json({
                status: 'success',
                data: {
                  message: 'Comment successfully added!',
                  newComment: newComment
                }
              }));

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", res.status(500).json({
                status: _context5.t0,
                message: _context5.t0.message
              }));

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, null, null, [[0, 9]]);
    }
  }, {
    key: "getArticle",
    value: function getArticle(req, res) {
      var id, article;
      return regeneratorRuntime.async(function getArticle$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              id = req.params.id;
              _context6.next = 4;
              return regeneratorRuntime.awrap(_Article["default"].findOne({
                where: {
                  id: id
                }
              }));

            case 4:
              article = _context6.sent;

              if (id) {
                _context6.next = 7;
                break;
              }

              throw new Error('Invalid parameter');

            case 7:
              return _context6.abrupt("return", res.status(200).json({
                status: 'success',
                data: {
                  article: article
                }
              }));

            case 10:
              _context6.prev = 10;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", res.status(500).json({
                status: _context6.t0,
                message: _context6.t0.message
              }));

            case 13:
            case "end":
              return _context6.stop();
          }
        }
      }, null, null, [[0, 10]]);
    }
  }]);

  return ArticleController;
}();

var _default = ArticleController;
exports["default"] = _default;