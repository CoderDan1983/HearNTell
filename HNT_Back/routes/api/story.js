const express = require('express');
const router = express.Router();
const storyController = require('../../controllers/storyController.js');

const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');


//* get stories :)
router.route('/')
    .get(verifyRoles(ROLES_LIST.Member), storyController.getStories);


//* Get a single story
// router.route('/:story_id')
//     .get(verifyRoles(ROLES_LIST.Member), storyController.getStory);

//* STORY Routes /api/story
  
//     Create a new story                          POST /api/story
router.route('/')
    .post(verifyRoles(ROLES_LIST.Member), storyController.create);

//     Get most popular stories for all tags       GET /api/story/tag/all
router.route('/tag/all')
    .get(verifyRoles(ROLES_LIST.Member), storyController.popular);

//     Get most popular stories for a tag          GET /api/story/tag/{tag_name}
router.route('/tag/:tag_name')
    .get(verifyRoles(ROLES_LIST.Member), storyController.popularByTag);

//     Search stories (tag, author, title)         GET /api/story/search/{search_string}
router.route('/search/:search_string')
    .get(verifyRoles(ROLES_LIST.Member), storyController.search);

//     Get stories by playlist                     GET /api/story/playlist/{playlist_id}
router.route('/playlist/:playlist_id')
    .get(verifyRoles(ROLES_LIST.Member), storyController.storiesForPlaylist);

//     Get stories by creator                      GET /api/story/creator/
router.route('/creator')
    .get(verifyRoles(ROLES_LIST.Member), storyController.storiesByCreator);

//     Get single story                            GET /api/story/{story_id}
// router.get('/:story_id', storyController.show);  //todo change it to this later!

//     Update an existing story                    POST /api/story/{story_id}
router.route('/:story_id')
    .post(verifyRoles(ROLES_LIST.Member), storyController.update)
    .delete(verifyRoles(ROLES_LIST.Member), storyController.remove); //DELETE /api/story/{story_id}
    
module.exports = router;
