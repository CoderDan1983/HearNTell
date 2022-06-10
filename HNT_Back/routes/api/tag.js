const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const creatorController = require('../../controllers/creatorController.js');
=======
const tagController = require('../../controllers/tagController.js');
>>>>>>> 464869fe80ddd121873f08d56cb969b978b7ce94

router.get('/:tag_id', tagController.getTag);

module.exports = router;