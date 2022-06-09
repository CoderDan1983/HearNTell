const express = require('express');
const router = express.Router();
const storyController = require('../../controllers/playlistController.js');

//* Get a single story
router.get('/:playlist_id', storyController.getPlaylist);
// router.post('/:story_id', storyController.saveStory);
module.exports = router;