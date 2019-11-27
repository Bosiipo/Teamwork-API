"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Article = _interopRequireDefault(require("../models/Article.model"));

var _Tag = _interopRequireDefault(require("../models/Tag.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TagController =
/*#__PURE__*/
function () {
  function TagController() {
    _classCallCheck(this, TagController);
  }

  _createClass(TagController, null, [{
    key: "createTag",
    value: function createTag(req, res) {
      var employee, savedTag;
      return regeneratorRuntime.async(function createTag$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              employee = req.employee; // Create and save the order

              _context.next = 4;
              return regeneratorRuntime.awrap(_Tag["default"].create(req.body, {
                w: 1
              }, {
                returning: true
              }));

            case 4:
              savedTag = _context.sent;
              console.log(req.body);
              console.log(employee);
              employee.article.forEach(function (item) {
                var article = _Article["default"].findById(item.id);

                if (!article) {
                  return res.status(400);
                }

                var artag = {
                  tagId: savedTag.id,
                  articleId: item.id,
                  qty: item.qty
                };
                var savedArticleTag = ArticleTag.create(artag, {
                  w: 1
                }, {
                  returning: true
                });
              });
              return _context.abrupt("return", res.status(200).json(savedTag));

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", res.status(500).json({
                status: _context.t0,
                message: _context.t0.message
              }));

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 11]]);
    }
  }, {
    key: "getAllTags",
    value: function getAllTags(req, res) {
      var allTags;
      return regeneratorRuntime.async(function getAllTags$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return regeneratorRuntime.awrap(_Tag["default"].findAll({
                // Make sure to include the articles
                include: [{
                  model: _Article["default"],
                  as: 'article',
                  required: false,
                  // Pass in the Article attributes that you want to retrieve
                  attributes: ['id', 'title'],
                  through: {
                    // This block of code allows you to retrieve the properties of the join table
                    model: ArticlesTag,
                    as: 'articlesTag',
                    attributes: ['qty']
                  }
                }]
              }));

            case 3:
              allTags = _context2.sent;
              return _context2.abrupt("return", respondWith(res, 200, ['Returning all articles'], {
                allTags: allTags
              }));

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", res.status(500).json({
                status: _context2.t0,
                message: _context2.t0.message
              }));

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 7]]);
    }
  }]);

  return TagController;
}();

var _default = TagController;
exports["default"] = _default;