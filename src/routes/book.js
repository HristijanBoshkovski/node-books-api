const express = require('express');
const { body } = require('express-validator');

const bookController = require('../controllers/book');

const router = express.Router();

router.get('/', bookController.getBooks);

router.get('/:bookId', bookController.getBook);

router.post(
    '/', 
    [
        body('title')
            .trim()
            .isLength({ min: 5 })
            .not()
            .isEmpty(),
        body('description')
            .trim()
            .isLength({ min: 10 })
            .not()
            .isEmpty(),
        body('numberOfPages')
            .isNumeric({no_symbols: true})
            .not()
            .isEmpty(),
        body('publishedOn')
            .trim()
            .isISO8601()
            .not()
            .isEmpty()
    ],
    bookController.createBook
);

router.put(
    '/:bookId', 
    [
        body('title')
            .trim()
            .isLength({ min: 5 })
            .not()
            .isEmpty(),
        body('description')
            .trim()
            .isLength({ min: 10 })
            .not()
            .isEmpty(),
        body('numberOfPages')
            .isNumeric({no_symbols: true})
            .not()
            .isEmpty(),
        body('publishedOn')
            .trim()
            .isISO8601()
            .not()
            .isEmpty()
    ],
    bookController.updateBook
);

router.delete('/:bookId', bookController.deleteBook);

module.exports = router;