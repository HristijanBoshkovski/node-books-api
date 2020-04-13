const express = require('express');
const { body } = require('express-validator');

const genreController = require('../controllers/genre');

const router = express.Router();

router.get('/', genreController.getGenres);

router.get('/:genreId', genreController.getGenre);

router.post(
    '/', 
    [
        body('genre')
            .trim()
            .not()
            .isEmpty()
    ],
    genreController.createGenre
);

router.put(
    '/:genreId', 
    [
        body('genre')
            .trim()
            .not()
            .isEmpty()
    ],
    genreController.updateGenre
);

router.delete('/:genreId', genreController.deleteGenre);

module.exports = router;