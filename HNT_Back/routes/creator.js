const express = require('express');
const router = express.Router();
const creatorController = require('../controllers/creatorController.js');

router.post('/updateCreatorProfile', creatorController.updateCreatorProfile);

module.exports = router;