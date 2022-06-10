const express = require('express');
const router = express.Router();
const searchController = require('../../controllers/searchController.js');

router.get('/:search_id', searchController.getSearch);

module.exports = router;



//todo USER SEARCH Routes /api/user_search

//     Create (record) new search                  POST /api/user_search

//     Remove search record                        DELETE /api/user_search/{user_search_id}

//     Get searches by user                        GET /api/user_search/{user_id}