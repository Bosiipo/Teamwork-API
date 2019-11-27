"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Gif = _interopRequireDefault(require("../models/Gif.model"));

var _Comment = _interopRequireDefault(require("../models/Comment.model"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'bosiipo',
  api_key: '682779169825433',
  api_secret: 'SC7UQjHcHENf7qw5TyvrxLzkE-4'
});

var GifController =
/*#__PURE__*/
function () {
  function GifController() {
    _classCallCheck(this, GifController);
  }

  _createClass(GifController, null, [{
    key: "createGif",
    value: function createGif(req, res) {
      var title, image, employeeId, uploadImage, imagePath, result;
      return regeneratorRuntime.async(function createGif$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              title = req.body.title;
              image = req.files.image;
              employeeId = req.employee.id;
              console.log(req.files);

              uploadImage = function uploadImage(imagePath) {
                return new Promise(function (resolve, reject) {
                  cloudinary.uploader.upload(imagePath, function (error, result) {
                    if (error) {
                      reject(error);
                    } else {
                      resolve(result);
                    }
                  });
                });
              };

              imagePath = _path["default"].resolve("./API/src/temp_images/".concat(image.name));
              _context.next = 9;
              return regeneratorRuntime.awrap(image.mv(imagePath));

            case 9:
              _context.next = 11;
              return regeneratorRuntime.awrap(uploadImage(imagePath));

            case 11:
              result = _context.sent;

              _fs["default"].unlink(imagePath, function (error) {
                if (error) throw new Error(error.message);
              });

              _context.next = 15;
              return regeneratorRuntime.awrap(_Gif["default"].create({
                employeeId: employeeId,
                title: title,
                imageUrl: result.secure_url
              }));

            case 15:
              return _context.abrupt("return", res.status(200).json({
                status: 'success',
                data: {
                  // gifId: employeeId,
                  message: 'Successfully created Gif',
                  title: title,
                  result: result.secure_url
                }
              }));

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", res.status(500).json({
                status: _context.t0,
                message: _context.t0.message
              }));

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 18]]);
    }
  }, {
    key: "deleteGif",
    value: function deleteGif(req, res) {
      var id, employeeId, gif;
      return regeneratorRuntime.async(function deleteGif$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              id = req.params.id;
              employeeId = req.employee.id;
              _context2.next = 5;
              return regeneratorRuntime.awrap(_Gif["default"].findOne({
                where: {
                  id: id
                }
              }));

            case 5:
              gif = _context2.sent;

              if (id) {
                _context2.next = 8;
                break;
              }

              throw new Error("Gif with ".concat(id, " does not exist"));

            case 8:
              if (!(gif.employeeId !== req.employee.id)) {
                _context2.next = 10;
                break;
              }

              throw new Error('You cannot do that!');

            case 10:
              _context2.next = 12;
              return regeneratorRuntime.awrap(_Gif["default"].destroy({
                where: {
                  id: id
                }
              }));

            case 12:
              return _context2.abrupt("return", res.status(200).json({
                status: 'success',
                data: {
                  message: 'Gif successfully deleted'
                }
              }));

            case 15:
              _context2.prev = 15;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", res.status(500).json({
                status: _context2.t0,
                message: _context2.t0.message
              }));

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 15]]);
    }
  }, {
    key: "fetchAllGif",
    value: function fetchAllGif(req, res) {
      var gifs;
      return regeneratorRuntime.async(function fetchAllGif$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return regeneratorRuntime.awrap(_Gif["default"].findAll({
                where: {
                  employeeId: req.employee.id
                },
                order: [['createdAt', 'DESC']]
              }));

            case 3:
              gifs = _context3.sent;
              return _context3.abrupt("return", res.status(200).json({
                status: 'success',
                data: {
                  gifs: gifs
                }
              }));

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", res.status(500).json({
                status: _context3.t0,
                message: _context3.t0.message
              }));

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 7]]);
    }
  }, {
    key: "addComment",
    value: function addComment(req, res) {
      var gifId, comment, newComment;
      return regeneratorRuntime.async(function addComment$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              gifId = req.params.id;
              comment = req.body.comment;
              _context4.next = 5;
              return regeneratorRuntime.awrap(_Comment["default"].create({
                gifId: Number(gifId),
                comment: comment
              }));

            case 5:
              newComment = _context4.sent;
              return _context4.abrupt("return", res.status(200).json({
                status: 'success',
                data: {
                  message: 'Comment successfully added!',
                  newComment: newComment
                }
              }));

            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", res.status(500).json({
                status: _context4.t0,
                message: _context4.t0.message
              }));

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[0, 9]]);
    }
  }, {
    key: "getGif",
    value: function getGif(req, res) {
      var id, gif;
      return regeneratorRuntime.async(function getGif$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              id = req.params.id;
              _context5.next = 4;
              return regeneratorRuntime.awrap(_Gif["default"].findOne({
                where: {
                  id: id
                }
              }));

            case 4:
              gif = _context5.sent;

              if (id) {
                _context5.next = 7;
                break;
              }

              throw new Error('Invalid parameter');

            case 7:
              return _context5.abrupt("return", res.status(200).json({
                status: 'success',
                data: {
                  gif: gif
                }
              }));

            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", res.status(500).json({
                status: _context5.t0,
                message: _context5.t0.message
              }));

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, null, null, [[0, 10]]);
    }
  }]);

  return GifController;
}();

var _default = GifController;
exports["default"] = _default;