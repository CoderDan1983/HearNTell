const express = require('express');
const router = express.Router();
const storyRatingController = require('../../controllers/storyRatingController.js');


//* STORY RATING Routes /api/rating 

// Create a new rating                         POST /api/rating 
router.post('/', storyRatingController.create);

// Get a single rating by story and user       GET /api/rating/user/{account_id}/story/{story_id}
router.get('/user/:account_id/story/:story_id', storyRatingController.byAccountAndStory);

// Get all the ratings for a story             GET /api/rating/story/{story_id}
router.get('/story/:story_id', storyRatingController.index);

// Get a story rating by id                    GET /api/rating/{story_rating_id}
router.get('/:story_rating_id', storyRatingController.show);

// Update an existing rating                   POST /api/rating/{story_rating_id}
router.post('/:story_rating_id', storyRatingController.update);

// Delete a rating                             DELETE /api/rating/{story_rating_id}   
router.delete('/:story_rating_id', storyRatingController.remove);


module.exports = router;