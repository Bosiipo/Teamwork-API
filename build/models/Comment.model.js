"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _database = _interopRequireDefault(require("../config/database"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Comment = _database["default"].define('comment', {
  id: {
    type: _sequelize["default"].INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  comment: {
    type: _sequelize["default"].STRING
  },
  createdAt: _sequelize["default"].DATEONLY,
  updatedAt: _sequelize["default"].DATEONLY
});

var _default = Comment;
exports["default"] = _default;