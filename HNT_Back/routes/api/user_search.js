const express = require('express');
const router = express.Router();
const userSearchController = require('../../controllers/userSearchController.js');

router.get('/:search_id', searchController.getSearch);


//* USER SEARCH Routes /api/user_search

//     Create (record) new search                  POST /api/user_search
router.post('/', searchController.create);

//     Remove search record                        DELETE /api/user_search/{user_search_id}
router.delete('/:user_search_id', searchController.remove);

//     Get searches by user                        GET /api/user_search/{user_id}
router.get('/:user_id', searchController.searchesByUser);


module.exports = router;