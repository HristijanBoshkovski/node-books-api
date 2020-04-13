const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Genre = sequelize.define('genre', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    genre: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Genre;