"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AuthController =
/*#__PURE__*/
function () {
  function AuthController() {
    _classCallCheck(this, AuthController);
  }

  _createClass(AuthController, null, [{
    key: "decodeToken",
    value: function decodeToken(req) {
      var token, jwtToken, decoded;
      return regeneratorRuntime.async(function decodeToken$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              // Request for token
              token = req.headers.authorization;

              if (token) {
                _context.next = 4;
                break;
              }

              throw new Error('Token not provided');

            case 4:
              // Grab token
              jwtToken = token.split(' ')[1]; //   Decode token

              _context.next = 7;
              return regeneratorRuntime.awrap(_jsonwebtoken["default"].verify(jwtToken, _config["default"].secret));

            case 7:
              decoded = _context.sent;
              return _context.abrupt("return", decoded);

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              throw new Error('Invalid Auth Token');

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 11]]);
    }
  }, {
    key: "verifyAdmin",
    value: function verifyAdmin(req, res, next) {
      var decoded;
      return regeneratorRuntime.async(function verifyAdmin$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return regeneratorRuntime.awrap(AuthController.decodeToken(req));

            case 3:
              decoded = _context2.sent;

              if (decoded.isAdmin) {
                _context2.next = 6;
                break;
              }

              throw new Error('Unauthorized');

            case 6:
              req.admin = decoded.admin;
              next();
              return _context2.abrupt("return", true);

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", res.status(401).json({
                status: 'error',
                message: err.message
              }));

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 11]]);
    }
  }, {
    key: "verifyEmployee",
    value: function verifyEmployee(req, res, next) {
      var decoded;
      return regeneratorRuntime.async(function verifyEmployee$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return regeneratorRuntime.awrap(AuthController.decodeToken(req));

            case 3:
              decoded = _context3.sent;
              req.employee = decoded.employee;
              next();
              return _context3.abrupt("return", true);

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", res.status(401).json({
                status: 'error',
                message: err.message
              }));

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 9]]);
    }
  }]);

  return AuthController;
}();

var _default = AuthController;
exports["default"] = _default;