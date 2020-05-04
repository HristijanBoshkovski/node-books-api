const { validationResult } = require('express-validator');

const sequelize = require('../utils/database');
const Type = require('../models/type');

exports.getTypes = async (req, res, next) => {
    try {
        // Get all types using findAll() function from Sequelize
        //const types = await Type.findAll();

        // Get all types using SQL query
        const types = await sequelize.query('SELECT * FROM types', {
            type: sequelize.QueryTypes.SELECT // needed in order not to get double result (metadata)
        });

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
        // Get type with specific typeId using findByPk() function from Sequelize
        //const type = await Type.findByPk(typeId);

        // Get type with specific typeId using SQL query
        const type = await sequelize.query('SELECT * FROM types WHERE id = ?', {
            replacements: [typeId], // using parameters inside query
            type: sequelize.QueryTypes.SELECT // needed in order not to get double result (metadata)
        });

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
    const date = new Date();
    try {
        // Create type by using create function from Sequelize
        // const result = await Type.create({
        //     type: type
        // });

        // Insert type by using SQL query
        const insertType = await sequelize.query('INSERT INTO types (type, createdAt, updatedAt) VALUES (?, ?, ?)', {
            replacements: [type, date, date], // using parameters inside query
            type: sequelize.QueryTypes.INSERT // needed in order not to get double result (metadata)
        });

        // Get the inserted type in order to return it in the response
        const result = await sequelize.query('SELECT * FROM types WHERE id = ?', {
            replacements: [insertType[0]], // using parameters inside query
            type: sequelize.QueryTypes.SELECT // needed in order not to get double result (metadata)
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
        // Update type using Sequelize functions
        // const typeToUpdate = await Type.findByPk(typeId);
        // typeToUpdate.type = type;
        // await typeToUpdate.save();

        // Update type using SQL query
        await sequelize.query('UPDATE types SET type = ? WHERE id = ?', {
            replacements: [type, typeId], // using parameters inside query
            type: sequelize.QueryTypes.UPDATE // needed in order not to get double result (metadata)
        });

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
        // Delete type using Sequelize functions
        // const typeToDelete = await Type.findByPk(typeId);
        // await typeToDelete.destroy();

        // Delete type using SQL query
        await sequelize.query('DELETE FROM types WHERE id = ?', {
            replacements: [typeId], // using parameters inside query
            type: sequelize.QueryTypes.UPDATE // needed in order not to get double result (metadata)
        });

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
