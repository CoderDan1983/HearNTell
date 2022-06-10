const express = require('express');
const router = express.Router();
const tagController = require('../../controllers/tagController.js');

router.get('/:tag_id', tagController.getTag);

module.exports = router;