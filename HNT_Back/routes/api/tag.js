const express = require('express');
const router = express.Router();
const tagController = require('../../controllers/tagController.js');



//* TAG Routes /api/tag

//     Create a new tag                            POST /api/tag
router.post('/', tagController.create);

//     Get a list of all tags                      GET /api/tag
router.get('/', tagController.index);

//     Get tags for a story                        GET /api/tag/story/{story_id}
router.get('/story/:story_id', tagController.tagsForStory);

//     Get most popular tags                       GET /api/tag/popular
router.get('/popular', tagController.popular);

//     Get single tag                              GET /api/tag/{tag_id}
router.get('/:tag_id', tagController.getTag);

//     Update an existing tag                      POST /api/tag/{tag_id}
router.post('/:tag_id', tagController.update);

//     Delete a tag                                DELETE /api/tag/{tag_id}
router.delete('/:tag_id', tagController.remove);



module.exports = router;
