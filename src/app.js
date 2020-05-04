const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./utils/database');

const Book = require('./models/book');
const Type = require('./models/type');
const Genre = require('./models/genre');
const Author = require('./models/author');
const Publisher = require('./models/publisher');
const authorRoutes = require('./routes/author');
const bookRoutes = require('./routes/book');
const genreRoutes = require('./routes/genre');
const publisherRoutes = require('./routes/publisher');
const typeRoutes = require('./routes/type');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/author', authorRoutes);
app.use('/book', bookRoutes);
app.use('/genre', genreRoutes);
app.use('/publisher', publisherRoutes);
app.use('/type', typeRoutes);

app.use((error, req, res, next) => {
    console.log('Error: ', error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({
        error: {
            statusCode: status,
            message: message
        }
    });
});

Author.hasMany(Book);
Book.belongsTo(Author);
Publisher.hasMany(Book);
Book.belongsTo(Publisher);
Type.hasMany(Book);
Book.belongsTo(Type);
Genre.hasMany(Book);
Book.belongsTo(Genre);

sequelize.sync({alter: true})
    .then(result => {
        app.listen(8023);
    })
    .catch(err => {
        console.log(err);
    });
