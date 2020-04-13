const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-books-api', 'root', 'somepassword', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;