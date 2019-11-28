const Sequelize = require('sequelize');

module.exports = new Sequelize(process.env.DATABASE_URL, {
  host: 'localhost',
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: true
  }
});
