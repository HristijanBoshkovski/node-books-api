const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Type = sequelize.define('type', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Type;