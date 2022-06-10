const express = require('express');
const router = express.Router();
const searchController = require('../../controllers/searchController.js');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

//* Get a single "search"
router.route('/:search_id')
    .get(verifyRoles(ROLES_LIST.Member), searchController.getSearch);
// router.get('/:search_id', searchController.getSearch);

module.exports = router;