const express = require('express');
const router = express.Router();
const tagController = require('../../controllers/tagController.js');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/:tag_id')
    .get(verifyRoles(ROLES_LIST.Member), tagController.getTag)
// router.get('/:tag_id', );

module.exports = router;