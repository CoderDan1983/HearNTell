const express = require('express');
const router = express.Router();
const userSearchController = require('../../controllers/userSearchController.js');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.get('/:search_id', searchController.getSearch);


//* USER SEARCH Routes /api/user_search

//     Create (record) new search                  POST /api/user_search
router.route('/')
    .post(verifyRoles(ROLES_LIST.Member), searchController.create);

//     Remove search record                        DELETE /api/user_search/{user_search_id}
router.route('/:user_search_id')
    .delete(verifyRoles(ROLES_LIST.Member), searchController.remove);

//     Get searches by user                        GET /api/user_search/{user_id}
router.route('/:user_id')
    .get(verifyRoles(ROLES_LIST.Member), searchController.searchesByUser);


module.exports = router;