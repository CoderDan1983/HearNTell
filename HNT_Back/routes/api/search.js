const express = require('express');
const router = express.Router();
const searchController = require('../../controllers/searchController.js');

router.get('/:search_id', searchController.getSearch);

module.exports = router;