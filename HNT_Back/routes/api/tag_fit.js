const express = require('express');
const router = express.Router();
const tagFitController = require('../../controllers/tagFitController.js');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');


//* TAG FIT Routes /api/tag_fit

// Create/update a new tag_fit                 POST /api/tag_fit
router.route('/')
  .post(verifyRoles(ROLES_LIST.Member), storyController.create);

// Get all the tag_fits for a tag              GET /api/tag_fit/tag/{tag_name}
router.route('/tag/:tag_name')
  .get(verifyRoles(ROLES_LIST.Member), storyController.tagIndex);

// Remove a tag fit                            DELETE /api/tag_fit/{tag_fit_id}
router.route('/:tag_fit_id')
  .delete(verifyRoles(ROLES_LIST.Member), storyController.remove);


module.exports = router;