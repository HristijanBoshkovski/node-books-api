const { validationResult } = require('express-validator');

const Author = require('../models/author');

exports.getAuthors = async (req, res, next) => {
    try {
        const authors = await Author.findAll();

        res.status(200).json({
            message: 'Authors fetched successfully',
            authors: authors
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};

exports.getAuthor = async (req, res, next) => {
    const authorId = req.params.authorId;
    try {
        const author = await Author.findByPk(authorId);

        res.status(200).json({
            message: 'Author fetched successfully',
            author: author
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};

exports.createAuthor = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        next(error);
    }

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const country = req.body.country;
    try {
        const result = await Author.create({
            firstName: firstName,
            lastName: lastName,
            age: age,
            country: country
        });

        res.status(201).json({
            message: 'Author created successfully!',
            author: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};

exports.updateAuthor = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        next(error);
    }

    const authorId = req.params.authorId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const country = req.body.country;
    try {
        const authorToUpdate = await Author.findByPk(authorId);
        authorToUpdate.firstName = firstName;
        authorToUpdate.lastName = lastName;
        authorToUpdate.age = age;
        authorToUpdate.country = country;
        await authorToUpdate.save();

        res.status(200).json({
            message: 'Author updated successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};

exports.deleteAuthor = async (req, res, next) => {
    const authorId = req.params.authorId;
    try {
        const authorToDelete = await Author.findByPk(authorId);
        await authorToDelete.destroy();

        res.status(200).json({
            message: 'Author deleted successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};
