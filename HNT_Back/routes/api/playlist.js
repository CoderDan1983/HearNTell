const express = require('express');
const router = express.Router();
const playlistController = require('../../controllers/playlistController.js');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles'); //6/10/2022

router.route('/:playlist_id')
    .get(verifyRoles(ROLES_LIST.Member), playlistController.getPlaylist);

module.exports = router;