const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
module.exports = new Sequelize(process.env.DATABASE_URL, {
  host: 'localhost',
  dialect: 'postgres',
  protocol: 'postgres'
});
