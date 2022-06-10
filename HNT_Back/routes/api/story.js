const express = require('express');
const router = express.Router();
const storyController = require('../../controllers/storyController.js');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

//* get stories :)
router.route('/')
    .get(verifyRoles(ROLES_LIST.Member), storyController.getStories);

//* Get a single story
router.route('/:story_id')
    .get(verifyRoles(ROLES_LIST.Member), storyController.getStory);

module.exports = router;
