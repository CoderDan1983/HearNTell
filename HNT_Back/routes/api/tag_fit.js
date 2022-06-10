const express = require('express');
const router = express.Router();
const tagFitController = require('../../controllers/tagFitController.js');



//* TAG FIT Routes /api/tag_fit

// Create/update a new tag_fit                 POST /api/tag_fit
router.post('/', storyController.create);

// Get all the tag_fits for a tag              GET /api/tag_fit/tag/{tag_id}
router.get('/tag/:tag_id', storyController.tagIndex);

// Remove a tag fit                            DELETE /api/tag_fit/{tag_fit_id}
router.delete('/:tag_fit_id', storyController.remove);


module.exports = router;