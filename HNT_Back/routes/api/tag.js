const express = require('express');
const router = express.Router();
const creatorController = require('../../controllers/creatorController.js');

router.get('/:tag_id', tagController.getTag);

module.exports = router;