const express = require('express');
const plantController = require('../controllers/plant.js');

const router = express.Router();

router.post('/', plantController.create);

router.get('/', plantController.findAll);

router.get('/:id', plantController.findByPk);

router.patch('/:id', plantController.update);

router.delete('/:id', plantController.delete);

module.exports = router;
