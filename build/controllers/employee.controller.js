"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _Employee = _interopRequireDefault(require("../models/Employee.model"));

var _config = _interopRequireDefault(require("../config"));

var _Article = _interopRequireDefault(require("../models/Article.model"));

var _Gif = _interopRequireDefault(require("../models/Gif.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EmployeeController =
/*#__PURE__*/
function () {
  function EmployeeController() {
    _classCallCheck(this, EmployeeController);
  }

  _createClass(EmployeeController, null, [{
    key: "loginEmployee",
    value: function loginEmployee(req, res) {
      var _req$body, email, password, employee, result, safeEmployee, jwtToken;

      return regeneratorRuntime.async(function loginEmployee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, email = _req$body.email, password = _req$body.password;

              if (!(!email || !password)) {
                _context.next = 4;
                break;
              }

              throw new Error("Incorrect Parameters!");

            case 4:
              _context.next = 6;
              return regeneratorRuntime.awrap(_Employee["default"].findOne({
                where: {
                  email: email
                }
              }));

            case 6:
              employee = _context.sent;

              if (employee) {
                _context.next = 9;
                break;
              }

              throw new Error("Employee does not exist!");

            case 9:
              _context.next = 11;
              return regeneratorRuntime.awrap(_bcrypt["default"].compare(password, employee.password));

            case 11:
              result = _context.sent;

              if (result) {
                _context.next = 14;
                break;
              }

              throw new Error("Password does not match our records!");

            case 14:
              safeEmployee = {
                id: employee.id,
                firstname: employee.firstname,
                lastname: employee.lastname,
                email: employee.email
              };
              jwtToken = _jsonwebtoken["default"].sign({
                employee: safeEmployee
              }, _config["default"].secret, {
                expiresIn: 86400
              });
              return _context.abrupt("return", res.status(200).json({
                status: 'success',
                message: 'Employee Logged In',
                token: "Bearer ".concat(jwtToken),
                employee: safeEmployee
              }));

            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](0);
              res.status(500).json({
                error: _context.t0,
                message: _context.t0.message
              });

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 19]]);
    }
  }]);

  return EmployeeController;
}();

var _default = EmployeeController;
exports["default"] = _default;