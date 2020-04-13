const express = require('express');
const { body } = require('express-validator');

const authorController = require('../controllers/author');

const router = express.Router();

router.get('/', authorController.getAuthors);

router.get('/:authorId', authorController.getAuthor);

router.post(
    '/', 
    [
        body('firstName')
            .trim()
            .not()
            .isEmpty(),
        body('lastName')
            .trim()
            .isLength({ min: 5 })
            .not()
            .isEmpty(),
        body('age')
            .isNumeric({no_symbols: true})
            .not()
            .isEmpty(),
        body('country')
            .trim()
            .isISO31661Alpha3()
            .not()
            .isEmpty()
    ],
    authorController.createAuthor
);

router.put(
    '/:authorId', 
    [
        body('firstName')
            .trim()
            .not()
            .isEmpty(),
        body('lastName')
            .trim()
            .isLength({ min: 5 })
            .not()
            .isEmpty(),
        body('age')
            .isNumeric({no_symbols: true})
            .not()
            .isEmpty(),
        body('country')
            .trim()
            .isISO31661Alpha3()
            .not()
            .isEmpty()
    ],
    authorController.updateAuthor
);

router.delete('/:authorId', authorController.deleteAuthor);

module.exports = router;