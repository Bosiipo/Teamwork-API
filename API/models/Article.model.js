import db from '../config/database';
import Sequelize from 'sequelize';
import Employee from './Employee.model';
import Comment from './Comment.model';
import Tag from './Tag.model';

const Article = db.define('article', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  article: {
    type: Sequelize.STRING,
    allowNull: false
  },
  createdAt: Sequelize.DATEONLY,
  updatedAt: Sequelize.DATEONLY
});

Article.belongsTo(Employee, { constraints: true, onDelete: 'CASCADE' });
Article.hasMany(Comment, { constraints: true, onDelete: 'CASCADE' });
Article.belongsToMany(Tag, {
  through: 'ArticlesTag',
  as: 'tags',
  constraints: true,
  onDelete: 'CASCADE'
});

// Tag.belongsToMany(Article, {
//   through: 'ArticlesTag',
//   as: 'articles',
//   constraints: true,
//   onDelete: 'CASCADE'
// });

export default Article;
