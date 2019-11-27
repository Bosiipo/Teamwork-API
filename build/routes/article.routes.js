"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _article = _interopRequireDefault(require("../controllers/article.controller"));

var _auth = _interopRequireDefault(require("../controllers/auth.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Controller
var router = (0, _express.Router)();
router.get('/', _auth["default"].verifyEmployee, _article["default"].fetchAllArticles);
router.get('/:id', _auth["default"].verifyEmployee, _article["default"].getArticle);
router.post('/', _auth["default"].verifyEmployee, _article["default"].createArticle);
router.put('/:id', _auth["default"].verifyEmployee, _article["default"].editArticle);
router["delete"]('/:id', _auth["default"].verifyEmployee, _article["default"].deleteArticle);
router.post('/:id/comment', _auth["default"].verifyEmployee, _article["default"].addComment);
var _default = router;
exports["default"] = _default;