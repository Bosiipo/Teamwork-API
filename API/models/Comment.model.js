import db from '../config/database';
import Sequelize from 'sequelize';

const Comment = db.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    comment: {
        type: Sequelize.STRING,
    },
    createdAt: Sequelize.DATEONLY,
    updatedAt: Sequelize.DATEONLY,
});

export default Comment;
