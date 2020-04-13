const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Book = sequelize.define('book', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    numberOfPages: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    publishedOn: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

module.exports = Book;