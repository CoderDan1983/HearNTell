//todo This should probably be just part of the playlist routes.

const express = require('express');
const router = express.Router();
const queueController = require('../../controllers/queueController.js');

router.get('/:user_id', queueController.getQueue);
router.get('/test', queueController.test);
module.exports = router;