const express = require('express');
const router = express.Router();
const storyRatingController = require('../../controllers/storyRatingController.js');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

//* STORY RATING Routes /api/rating 

// Create a new rating                         POST /api/rating 
router.route('/')
  .post(verifyRoles(ROLES_LIST.Member), storyRatingController.create);

// Get a single rating by story and user       GET /api/rating/user/{account_id}/story/{story_id}
router.route('/user/:account_id/story/:story_id')
  .get(verifyRoles(ROLES_LIST.Member), storyRatingController.byAccountAndStory);

// Get all the ratings for a story             GET /api/rating/story/{story_id}
router.route('/story/:story_id')
  .get(verifyRoles(ROLES_LIST.Member), storyRatingController.index);

// Get a story rating by id                    GET /api/rating/{story_rating_id}
router.route('/:story_rating_id')
  .get(verifyRoles(ROLES_LIST.Member), storyRatingController.show);

// Update an existing rating                   POST /api/rating/{story_rating_id}
router.route('/:story_rating_id')
  .post(verifyRoles(ROLES_LIST.Member), storyRatingController.update);

// Delete a rating                             DELETE /api/rating/{story_rating_id}   
router.route('/:story_rating_id')
  .delete(verifyRoles(ROLES_LIST.Member), storyRatingController.remove);


module.exports = router;