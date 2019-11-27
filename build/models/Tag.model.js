"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _database = _interopRequireDefault(require("../config/database"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _Article = _interopRequireDefault(require("./Article.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Tag = _database["default"].define('tag', {
  id: {
    type: _sequelize["default"].INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: _sequelize["default"].STRING,
    allowNull: false
  },
  qty: {
    type: _sequelize["default"].INTEGER,
    allowNull: false
  },
  createdAt: _sequelize["default"].DATEONLY,
  updatedAt: _sequelize["default"].DATEONLY
});

var _default = Tag;
exports["default"] = _default;