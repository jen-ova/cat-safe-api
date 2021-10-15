const express = require('express');

const plantController = require('../controllers/plant.js');

const router = express.Router();

router.post('/', plantController.create);

module.exports = router;
