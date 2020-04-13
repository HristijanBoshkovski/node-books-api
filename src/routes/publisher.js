const express = require('express');
const { body } = require('express-validator');

const publisherController = require('../controllers/publisher');

const router = express.Router();

router.get('/', publisherController.getPublishers);

router.get('/:publisherId', publisherController.getPublisher);

router.post(
    '/', 
    [
        body('publisher')
            .trim()
            .not()
            .isEmpty(),
        body('country')
            .trim()
            .isISO31661Alpha3()
            .not()
            .isEmpty()
    ],
    publisherController.createPublisher
);

router.put(
    '/:publisherId', 
    [
        body('publisher')
            .trim()
            .not()
            .isEmpty(),
        body('country')
            .trim()
            .isISO31661Alpha3()
            .not()
            .isEmpty()
    ],
    publisherController.updatePublisher
);

router.delete('/:publisherId', publisherController.deletePublisher);

module.exports = router;