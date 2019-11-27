"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _Admin = _interopRequireDefault(require("../models/Admin.model"));

var _Employee = _interopRequireDefault(require("../models/Employee.model"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AdminController =
/*#__PURE__*/
function () {
  function AdminController() {
    _classCallCheck(this, AdminController);
  }

  _createClass(AdminController, null, [{
    key: "registerAdmin",
    value: function registerAdmin(req, res) {
      var _req$body, firstname, lastname, email, password, hashedPassword, emailIni, admin, safeAdmin, jwtToken;

      return regeneratorRuntime.async(function registerAdmin$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, firstname = _req$body.firstname, lastname = _req$body.lastname, email = _req$body.email, password = _req$body.password;

              if (!(!firstname || !lastname || !email || !password)) {
                _context.next = 4;
                break;
              }

              throw new Error('Incorrect parameters');

            case 4:
              _context.next = 6;
              return regeneratorRuntime.awrap(_bcrypt["default"].hashSync(password, 10));

            case 6:
              hashedPassword = _context.sent;
              _context.next = 9;
              return regeneratorRuntime.awrap(_Admin["default"].findOne({
                where: {
                  email: email
                }
              }));

            case 9:
              emailIni = _context.sent;

              if (!emailIni) {
                _context.next = 12;
                break;
              }

              throw new Error('Admin already exists');

            case 12:
              _context.next = 14;
              return regeneratorRuntime.awrap(_Admin["default"].create({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: hashedPassword
              }));

            case 14:
              admin = _context.sent;
              safeAdmin = {
                id: admin.id,
                firstname: admin.firstname,
                lastname: admin.lastname,
                email: admin.email
              };
              jwtToken = _jsonwebtoken["default"].sign({
                admin: safeAdmin,
                isAdmin: true
              }, _config["default"].secret, {
                expiresIn: 86400
              });
              return _context.abrupt("return", res.status(201).json({
                status: 'success',
                message: 'Admin Registered',
                token: "Bearer ".concat(jwtToken),
                Admin: safeAdmin
              }));

            case 20:
              _context.prev = 20;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", res.status(500).json({
                status: 'error',
                message: _context.t0.message
              }));

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 20]]);
    }
  }, {
    key: "loginAdmin",
    value: function loginAdmin(req, res, next) {
      var _req$body2, email, password, admin, result, safeAdmin, jwtToken;

      return regeneratorRuntime.async(function loginAdmin$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

              if (!(!email || !password)) {
                _context2.next = 4;
                break;
              }

              throw new Error('Incorrect parameters');

            case 4:
              _context2.next = 6;
              return regeneratorRuntime.awrap(_Admin["default"].findOne({
                where: {
                  email: email
                }
              }));

            case 6:
              admin = _context2.sent;

              if (admin) {
                _context2.next = 9;
                break;
              }

              throw new Error("Admin does not exist");

            case 9:
              _context2.next = 11;
              return regeneratorRuntime.awrap(_bcrypt["default"].compare(password, admin.password));

            case 11:
              result = _context2.sent;

              if (result) {
                _context2.next = 14;
                break;
              }

              throw new Error("Password doesn't match our records");

            case 14:
              safeAdmin = {
                id: admin.id,
                firstname: admin.firstname,
                lastname: admin.lastname,
                email: admin.email
              };
              jwtToken = _jsonwebtoken["default"].sign({
                admin: safeAdmin,
                isAdmin: true
              }, _config["default"].secret, {
                expiresIn: 86400
              });
              return _context2.abrupt("return", res.status(200).json({
                status: 'success',
                message: 'Admin Logged in',
                token: "Bearer ".concat(jwtToken),
                admin: safeAdmin
              }));

            case 19:
              _context2.prev = 19;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", res.status(500).json({
                status: 'error',
                message: _context2.t0.message
              }));

            case 22:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 19]]);
    }
  }, {
    key: "createEmployee",
    value: function createEmployee(req, res) {
      var _req$body3, firstname, lastname, email, password, gender, jobRole, department, address, adminId, hashedPassword, emailIni, employee, safeEmployee, jwtToken;

      return regeneratorRuntime.async(function createEmployee$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _req$body3 = req.body, firstname = _req$body3.firstname, lastname = _req$body3.lastname, email = _req$body3.email, password = _req$body3.password, gender = _req$body3.gender, jobRole = _req$body3.jobRole, department = _req$body3.department, address = _req$body3.address;

              if (!(!firstname || !lastname || !email || !password || !gender || !jobRole || !department || !address)) {
                _context3.next = 4;
                break;
              }

              throw new Error('Incorrect parameters');

            case 4:
              adminId = req.admin.id;
              _context3.next = 7;
              return regeneratorRuntime.awrap(_bcrypt["default"].hashSync(password, 10));

            case 7:
              hashedPassword = _context3.sent;
              _context3.next = 10;
              return regeneratorRuntime.awrap(_Employee["default"].findOne({
                where: {
                  email: email
                }
              }));

            case 10:
              emailIni = _context3.sent;

              if (!emailIni) {
                _context3.next = 13;
                break;
              }

              throw new Error("Employee already exists!");

            case 13:
              _context3.next = 15;
              return regeneratorRuntime.awrap(_Employee["default"].create({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: hashedPassword,
                gender: gender,
                jobRole: jobRole,
                department: department,
                address: address,
                adminId: adminId
              }));

            case 15:
              employee = _context3.sent;
              safeEmployee = {
                adminId: adminId,
                id: employee.id,
                firstname: employee.firstname,
                lastname: employee.lastname,
                email: employee.email,
                gender: employee.gender,
                jobRole: employee.jobRole,
                department: employee.department,
                address: employee.address
              };
              jwtToken = _jsonwebtoken["default"].sign({
                employee: safeEmployee
              }, _config["default"].secret, {
                expiresIn: 86400
              });
              return _context3.abrupt("return", res.status(201).json({
                status: 'success',
                message: 'Employee Registered',
                token: "Bearer ".concat(jwtToken),
                employee: safeEmployee
              }));

            case 21:
              _context3.prev = 21;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", res.status(500).json({
                error: _context3.t0,
                message: _context3.t0.message
              }));

            case 24:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 21]]);
    }
  }]);

  return AdminController;
}();

var _default = AdminController;
exports["default"] = _default;