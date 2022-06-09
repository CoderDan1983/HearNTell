const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController.js');

router.get('/:user_id', playlistController.getPlaylist);

module.exports = router;