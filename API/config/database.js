const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
module.exports = new Sequelize('teamwork', 'postgres', 'Milky5way$', {
  host: 'localhost',
  dialect: 'postgres'
});