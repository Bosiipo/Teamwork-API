"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _admin = _interopRequireDefault(require("../controllers/admin.controller"));

var _auth = _interopRequireDefault(require("../controllers/auth.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Controller
// import EmployeeController from '../controllers/employee.controller';
var router = (0, _express.Router)();
router.post('/register', _admin["default"].registerAdmin);
router.post('/login', _admin["default"].loginAdmin);
router.post('/create-user', _auth["default"].verifyAdmin, _admin["default"].createEmployee);
router.get('/employee/:id', _auth["default"].verifyAdmin, _admin["default"].getEmployeeProfile);
var _default = router;
exports["default"] = _default;