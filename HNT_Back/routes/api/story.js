const express = require('express');
const router = express.Router();
const storyController = require('../../controllers/playlistController.js');

//* Get a single story
router.get('/:playlist_id', storyController.getPlaylist);
// router.post('/:story_id', storyController.saveStory);
module.exports = router;



//todo STORY Routes /api/story
  
//     Create a new story                          POST /api/story

//     Get most popular stories for all tags       GET /api/story/tag/all

//     Get most popular stories for a tag          GET /api/story/tag/{tag_id}

//     Search stories (tag, author, title)         GET /api/story/search/{search_string}

//     Get stories by playlist                     GET /api/story/playlist/{playlist_id}

//     Get stories by creator                      GET /api/story/creator/{creator_id}

//     Get single story                            GET /api/story/{story_id}

//     Update an existing story                    POST /api/story/{story_id}

//     Delete a story                              DELETE /api/story/{story_id}