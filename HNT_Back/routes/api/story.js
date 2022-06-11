const express = require('express');
const router = express.Router();
const storyController = require('../../controllers/storyController.js');

module.exports = router;


//* STORY Routes /api/story
  
//     Create a new story                          POST /api/story
router.post('/', storyController.create);

//     Get most popular stories for all tags       GET /api/story/tag/all
router.get('/tag/all', storyController.popular);

//     Get most popular stories for a tag          GET /api/story/tag/{tag_id}
router.get('/tag/:tag_id', storyController.popularByTag);

//     Search stories (tag, author, title)         GET /api/story/search/{search_string}
router.get('/search/:search_string', storyController.search);

//     Get stories by playlist                     GET /api/story/playlist/{playlist_id}
router.get('/playlist/:playlist_id', storyController.storiesForPlaylist);

//     Get stories by creator                      GET /api/story/creator/{creator_id}
router.get('/creator/:creator_id', storyController.storiesByCreator);

//     Get single story                            GET /api/story/{story_id}
router.get('/:story_id', storyController.show);

//     Update an existing story                    POST /api/story/{story_id}
router.post('/:story_id', storyController.update);

//     Delete a story                              DELETE /api/story/{story_id}
router.delete('/:story_id', storyController.remove);


module.exports = router;