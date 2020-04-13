const { validationResult } = require('express-validator');

const Genre = require('../models/genre');

exports.getGenres = async (req, res, next) => {
    try {
        const genres = await Genre.findAll();

        res.status(200).json({
            message: 'Genres fetched successfully',
            genres: genres
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};

exports.getGenre = async (req, res, next) => {
    const genreId = req.params.genreId;
    try {
        const genre = await Genre.findByPk(genreId);

        res.status(200).json({
            message: 'Genre fetched successfully',
            genre: genre
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};

exports.createGenre = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        next(error);
    }

    const genre = req.body.genre;
    try {
        const result = await Genre.create({
            genre: genre
        });

        res.status(201).json({
            message: 'Genre created successfully!',
            genre: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};

exports.updateGenre = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        next(error);
    }

    const genreId = req.params.genreId;
    const genre = req.body.genre;
    try {
        const genreToUpdate = await Genre.findByPk(genreId);
        genreToUpdate.genre = genre;
        await genreToUpdate.save();

        res.status(200).json({
            message: 'Genre updated successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};

exports.deleteGenre = async (req, res, next) => {
    const genreId = req.params.genreId;
    try {
        const genreToDelete = await Genre.findByPk(genreId);
        await genreToDelete.destroy();

        res.status(200).json({
            message: 'Genre deleted successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};
