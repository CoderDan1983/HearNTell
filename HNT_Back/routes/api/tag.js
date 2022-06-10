const express = require('express');
const router = express.Router();
const tagController = require('../../controllers/tagController.js');

router.get('/:tag_id', tagController.getTag);

module.exports = router;



//todo TAG Routes /api/tag

//     Create a new tag                            POST /api/tag

//     Get a list of all tags                      GET /api/tag/all

//     Get tags for a story                        GET /api/tag/story/{story_id}

//     Get most popular tags                       GET /api/tag/popular

//     Get single tag                              GET /api/tag/{tag_id}

//     Update an existing tag                      POST /api/tag/{tag_id}

//     Delete a tag                                DELETE /api/tag/{tag_id}