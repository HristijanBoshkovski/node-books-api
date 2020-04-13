const express = require('express');
const { body } = require('express-validator');

const typeController = require('../controllers/type');

const router = express.Router();

router.get('/', typeController.getTypes);

router.get('/:typeId', typeController.getType);

router.post(
    '/', 
    [
        body('type')
            .trim()
            .not()
            .isEmpty()
    ],
    typeController.createType
);

router.put(
    '/:typeId', 
    [
        body('type')
            .trim()
            .not()
            .isEmpty()
    ],
    typeController.updateType
);

router.delete('/:typeId', typeController.deleteType);

module.exports = router;