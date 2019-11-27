"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _employee = _interopRequireDefault(require("../controllers/employee.controller"));

var _auth = _interopRequireDefault(require("../controllers/auth.controller"));

var _article = _interopRequireDefault(require("../controllers/article.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// controller
var router = (0, _express.Router)();
router.post('/login', _employee["default"].loginEmployee);
router.post('/create-article', _auth["default"].verifyEmployee, _article["default"].createArticle);
router.patch('articles/:articleId', _auth["default"].verifyEmployee, _article["default"].editArticle);
var _default = router;
exports["default"] = _default;