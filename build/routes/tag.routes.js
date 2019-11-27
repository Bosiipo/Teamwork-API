"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _article = _interopRequireDefault(require("../controllers/article.controller"));

var _auth = _interopRequireDefault(require("../controllers/auth.controller"));

var _tag = _interopRequireDefault(require("../controllers/tag.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Controller
var router = (0, _express.Router)();
router.post('/create', _auth["default"].verifyEmployee, _tag["default"].createTag);
router.get('/', _auth["default"].verifyEmployee, _tag["default"].getAllTags);
var _default = router;
exports["default"] = _default;