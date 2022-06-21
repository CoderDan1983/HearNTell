const express = require('express');
const router = express.Router();
const tagController = require('../../controllers/tagController.js');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');


//* TAG Routes /api/tag

//     Create a new tag                            POST /api/tag
router.route('/')
    .post(verifyRoles(ROLES_LIST.Member), tagController.create);

//     Get a list of all tags                      GET /api/tag
router.route('/')
    .get(verifyRoles(ROLES_LIST.Member), tagController.index);

//     Get tags for a story                        GET /api/tag/story/{story_id}
router.route('/story/:story_id')
    .get(verifyRoles(ROLES_LIST.Member), tagController.tagsForStory);

//     Get most popular tags                       GET /api/tag/popular
router.route('/popular')
    .get(verifyRoles(ROLES_LIST.Member), tagController.popular);

//     Get single tag                              GET /api/tag/{tag_id}
router.route('/:tag_id')
    .get(verifyRoles(ROLES_LIST.Member), tagController.getTag);

//     Update an existing tag                      POST /api/tag/{tag_id}
router.route('/:tag_id')
    .post(verifyRoles(ROLES_LIST.Member), tagController.update);

//     Delete a tag                                DELETE /api/tag/{tag_id}
router.route('/:tag_id')
    .delete(verifyRoles(ROLES_LIST.Member), tagController.remove);

//    Common tags for creator                     GET /api/tag/common_tags/{creator_id}
router.route('/common_tags/creator_id')

module.exports = router;
