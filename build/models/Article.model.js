"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _database = _interopRequireDefault(require("../config/database"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _Employee = _interopRequireDefault(require("./Employee.model"));

var _Comment = _interopRequireDefault(require("./Comment.model"));

var _Tag = _interopRequireDefault(require("./Tag.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Article = _database["default"].define('article', {
  id: {
    type: _sequelize["default"].INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: _sequelize["default"].STRING,
    allowNull: false
  },
  article: {
    type: _sequelize["default"].STRING,
    allowNull: false
  },
  createdAt: _sequelize["default"].DATEONLY,
  updatedAt: _sequelize["default"].DATEONLY
});

Article.belongsTo(_Employee["default"], {
  constraints: true,
  onDelete: 'CASCADE'
});
Article.hasMany(_Comment["default"], {
  constraints: true,
  onDelete: 'CASCADE'
});
Article.belongsToMany(_Tag["default"], {
  through: 'ArticlesTag',
  as: 'tags',
  constraints: true,
  onDelete: 'CASCADE'
}); // Tag.belongsToMany(Article, {
//   through: 'ArticlesTag',
//   as: 'articles',
//   constraints: true,
//   onDelete: 'CASCADE'
// });

var _default = Article;
exports["default"] = _default;