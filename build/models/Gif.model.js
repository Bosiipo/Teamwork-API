"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = _interopRequireDefault(require("../config/database"));

var _Employee = _interopRequireDefault(require("../models/Employee.model"));

var _Comment = _interopRequireDefault(require("../models/Comment.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Gif = _database["default"].define('gif', {
  id: {
    type: _sequelize["default"].INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  imageUrl: {
    type: _sequelize["default"].STRING,
    allowNull: false
  },
  title: {
    type: _sequelize["default"].STRING,
    allowNull: false
  },
  createdAt: _sequelize["default"].DATEONLY,
  updatedAt: _sequelize["default"].DATEONLY
});

Gif.belongsTo(_Employee["default"], {
  constraints: true,
  onDelete: 'CASCADE'
});
Gif.hasMany(_Comment["default"], {
  constraints: true,
  onDelete: 'CASCADE'
});
var _default = Gif;
exports["default"] = _default;