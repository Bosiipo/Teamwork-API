const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
module.exports = new Sequelize('teamwork', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  protocol: 'postgres',
});

// process.env.DATABASE_URL
