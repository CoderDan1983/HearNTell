const express = require('express');
const router = express.Router();
const storyController = require('../controllers/storyController.js');

router.get('/:story_id', storyController.getStory);

module.exports = router;