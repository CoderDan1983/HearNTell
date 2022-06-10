const express = require('express');
const router = express.Router();
const queueController = require('../../controllers/queueController.js');

router.get('/:user_id', queueController.getQueue);

module.exports = router;