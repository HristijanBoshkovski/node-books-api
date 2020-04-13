const { validationResult } = require('express-validator');

const Publisher = require('../models/publisher');

exports.getPublishers = async (req, res, next) => {
    try {
        const publishers = await Publisher.findAll();

        res.status(200).json({
            message: 'Publishers fetched successfully',
            publishers: publishers
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};

exports.getPublisher = async (req, res, next) => {
    const publisherId = req.params.publisherId;
    try {
        const publisher = await Publisher.findByPk(publisherId);

        res.status(200).json({
            message: 'Publisher fetched successfully',
            publisher: publisher
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};

exports.createPublisher = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        next(error);
    }

    const publisher = req.body.publisher;
    const country = req.body.country;
    try {
        const result = await Publisher.create({
            publisher: publisher,
            country: country
        });

        res.status(201).json({
            message: 'Publisher created successfully!',
            publisher: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};

exports.updatePublisher = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        next(error);
    }

    const publisherId = req.params.publisherId;
    const publisher = req.body.publisher;
    const country = req.body.country;
    try {
        const publisherToUpdate = await Publisher.findByPk(publisherId);
        publisherToUpdate.publisher = publisher;
        publisherToUpdate.country = country;
        await publisherToUpdate.save();

        res.status(200).json({
            message: 'Publisher updated successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};

exports.deletePublisher = async (req, res, next) => {
    const publisherId = req.params.publisherId;
    try {
        const publisherToDelete = await Publisher.findByPk(publisherId);
        await publisherToDelete.destroy();

        res.status(200).json({
            message: 'Publisher deleted successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};
