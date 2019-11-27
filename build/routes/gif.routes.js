"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _gif = _interopRequireDefault(require("../controllers/gif.controller"));

var _auth = _interopRequireDefault(require("../controllers/auth.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Controller
var router = (0, _express.Router)();
router.get('/', _auth["default"].verifyEmployee, _gif["default"].fetchAllGif);
router.post('/', _auth["default"].verifyEmployee, _gif["default"].createGif);
router["delete"]('/:id', _auth["default"].verifyEmployee, _gif["default"].deleteGif);
router.post('/:id/comment', _auth["default"].verifyEmployee, _gif["default"].addComment);
router.post('/:id', _auth["default"].verifyEmployee, _gif["default"].getGif);
var _default = router;
exports["default"] = _default;