const express = require('express');
const router = express.Router();
const storyController = require('../../controllers/storyController.js');

//* Get a single story
router.get('/:story_id', storyController.getStory);
// router.post('/:story_id', storyController.saveStory);
module.exports = router;