// import Sequelize from 'sequelize';
// import db from '../config/database';

// const User = db.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   firstname: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   lastname: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: true
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   gender: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   jobRole: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   department: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   address: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   role: {
//     type: Sequelize.STRING,
//     defaultValue: 'User'
//   },
//   createdAt: Sequelize.DATEONLY,
//   updatedAt: Sequelize.DATEONLY
// });

// export default User;
