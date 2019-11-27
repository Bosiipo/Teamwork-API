const Sequelize = require('sequelize');
const db = require('../config/database');

import Admin from './Admin.model';

const Employee = db.define('employee', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    jobRole: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    department: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    createdAt: Sequelize.DATEONLY,
    updatedAt: Sequelize.DATEONLY,
});

Admin.hasMany(Employee, {constraints: true, onDelete: 'CASCADE'});

export default Employee;
