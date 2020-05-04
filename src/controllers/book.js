const { validationResult } = require('express-validator');

const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const Publisher = require('../models/publisher');
const Type = require('../models/type');

exports.getBooks = async (req, res, next) => {
    try {
        const books = await Book.findAll({
            include: [
                {
                    model: Type
                },
                {
                    model: Genre
                },
                {
                    model: Author
                },
                {
                    model: Publisher
                }
            ]
        });

        let booksList = [];

        for (const book of books) {
            const result = {
                id: book.id,
                title: book.title,
                description: book.description,
                numberOfPages: book.numberOfPages,
                publishedOn: book.publishedOn,
                createdAt: book.createdAt,
                updatedAt: book.updatedAt,
                type: book.type,
                genre: book.genre,
                author: book.author,
                publisher: book.publisher
            };
        
            booksList.push(result);
        }

        res.status(200).json({
            message: 'Books fetched successfully',
            books: booksList
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};

exports.getBook = async (req, res, next) => {
    const bookId = req.params.bookId;
    try {
        const book = await Book.findByPk(bookId, {
            include: [
                {
                    model: Type
                },
                {
                    model: Genre
                },
                {
                    model: Author
                },
                {
                    model: Publisher
                }
            ]
        });

        const result = {
            id: book.id,
            title: book.title,
            description: book.description,
            numberOfPages: book.numberOfPages,
            publishedOn: book.publishedOn,
            createdAt: book.createdAt,
            updatedAt: book.updatedAt,
            author: book.author,
            publisher: book.publisher,
            type: book.type,
            genre: book.genre
        };

        res.status(200).json({
            message: 'Book fetched successfully',
            book: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};

exports.createBook = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        next(error);
    }

    const title = req.body.title;
    const description = req.body.description;
    const numberOfPages = req.body.numberOfPages;
    const publishedOn = req.body.publishedOn;

    const author = await Author.findOne(
        {
            where: {
                firstName: req.body.authorFirstName,
                lastName: req.body.authorLastName
            }
        }
    );

    if (!author) {
        const error = new Error('Author not found, please create the author before creating a book.');
        error.statusCode = 404;
        next(error);
    }

    const publisher = await Publisher.findOne(
        {
            where: {
                publisher: req.body.publisher
            }
        }
    );

    if (!publisher) {
        const error = new Error('Publisher not found, please create the publisher before creating a book.');
        error.statusCode = 404;
        next(error);
    }

    const type = await Type.findOne(
        {
            where: {
                type: req.body.type
            }
        }
    );

    if (!type) {
        const error = new Error('Type not found, please create the type before creating a book.');
        error.statusCode = 404;
        next(error);
    }

    const genre = await Genre.findOne(
        {
            where: {
                genre: req.body.genre
            }
        }
    );

    if (!genre) {
        const error = new Error('Genre not found, please create the genre before creating a book.');
        error.statusCode = 404;
        next(error);
    }

    try {
        const result = await Book.create({
            title: title,
            description: description,
            numberOfPages: numberOfPages,
            publishedOn: publishedOn,
            authorId: author.id,
            publisherId: publisher.id,
            typeId: type.id,
            genreId: genre.id
        });

        res.status(201).json({
            message: 'Book created successfully!',
            book: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};

exports.updateBook = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        next(error);
    }

    const bookId = req.params.bookId;
    const title = req.body.title;
    const description = req.body.description;
    const numberOfPages = req.body.numberOfPages;
    const publishedOn = req.body.publishedOn;

    const author = await Author.findOne(
        {
            where: {
                firstName: req.body.authorFirstName,
                lastName: req.body.authorLastName
            }
        }
    );

    if (!author) {
        const error = new Error('Author not found, please create the author before creating a book.');
        error.statusCode = 404;
        next(error);
    }

    const publisher = await Publisher.findOne(
        {
            where: {
                publisher: req.body.publisher
            }
        }
    );

    if (!publisher) {
        const error = new Error('Publisher not found, please create the publisher before creating a book.');
        error.statusCode = 404;
        next(error);
    }

    const type = await Type.findOne(
        {
            where: {
                type: req.body.type
            }
        }
    );

    if (!type) {
        const error = new Error('Type not found, please create the type before creating a book.');
        error.statusCode = 404;
        next(error);
    }

    const genre = await Genre.findOne(
        {
            where: {
                genre: req.body.genre
            }
        }
    );

    if (!genre) {
        const error = new Error('Genre not found, please create the genre before creating a book.');
        error.statusCode = 404;
        next(error);
    }

    try {
        const bookToUpdate = await Book.findByPk(bookId);
        bookToUpdate.title = title;
        bookToUpdate.description = description;
        bookToUpdate.numberOfPages = numberOfPages;
        bookToUpdate.publishedOn = publishedOn;
        bookToUpdate.authorId = author.id;
        bookToUpdate.publisherId = publisher.id;
        bookToUpdate.typeId = type.id;
        bookToUpdate.genreId = genre.id;
        await bookToUpdate.save();

        res.status(200).json({
            message: 'Book updated successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};

exports.deleteBook = async (req, res, next) => {
    const bookId = req.params.bookId;
    try {
        const bookToDelete = await Book.findByPk(bookId);
        await bookToDelete.destroy();

        res.status(200).json({
            message: 'Book deleted successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};
