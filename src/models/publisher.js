const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Publisher = sequelize.define('publisher', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    publisher: {
        type: Sequelize.STRING,
        allowNull: false
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Publisher;