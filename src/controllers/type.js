const { validationResult } = require('express-validator');

const Type = require('../models/type');

exports.getTypes = async (req, res, next) => {
    try {
        const types = await Type.findAll();

        res.status(200).json({
            message: 'Types fetched successfully',
            types: types
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};

exports.getType = async (req, res, next) => {
    const typeId = req.params.typeId;
    try {
        const type = await Type.findByPk(typeId);

        res.status(200).json({
            message: 'Type fetched successfully',
            type: type
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};

exports.createType = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        next(error);
    }

    const type = req.body.type;
    try {
        const result = await Type.create({
            type: type
        });

        res.status(201).json({
            message: 'Type created successfully!',
            type: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};

exports.updateType = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        next(error);
    }

    const typeId = req.params.typeId;
    const type = req.body.type;
    try {
        const typeToUpdate = await Type.findByPk(typeId);
        typeToUpdate.type = type;
        await typeToUpdate.save();

        res.status(200).json({
            message: 'Type updated successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};

exports.deleteType = async (req, res, next) => {
    const typeId = req.params.typeId;
    try {
        const typeToDelete = await Type.findByPk(typeId);
        await typeToDelete.destroy();

        res.status(200).json({
            message: 'Type deleted successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};
