import Sequelize from 'sequelize';
import db from '../config/database';
import Employee from './Employee.model';
import Comment from './Comment.model';

const Gif = db.define('gif', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: Sequelize.DATEONLY,
  updatedAt: Sequelize.DATEONLY,
});

Gif.belongsTo(Employee, { constraints: true, onDelete: 'CASCADE' });
Gif.hasMany(Comment, { constraints: true, onDelete: 'CASCADE' });

export default Gif;
