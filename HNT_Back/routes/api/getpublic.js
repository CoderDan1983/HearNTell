const express = require('express');
const router = express.Router();
const storyController = require('../../controllers/storyController');
const playlistController = require('../../controllers/playlistController');

router.get('/story/:story_id', storyController.getStory);
router.get('/story', storyController.getStories);
// router.get('/getPlaylist/:playlist_id', playlistController.getPlaylist);

module.exports = router;

//*  basically, this route deals with grabbing routes for people not logged in.
//* it may be a mishmash from other routes, but it should help to keep the other
//* routes "pure".  I am open to a better suggestion :)

//* PS:  as such, getpublic has NO controller of its own :-0