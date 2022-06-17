const express = require('express');
const router = express.Router();
const playlistController = require('../../controllers/playlistController.js');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles'); //6/10/2022

router.route('/:playlist_id')
    .get(verifyRoles(ROLES_LIST.Member), playlistController.getPlaylist); //! old route


//* PLAYLIST Routes /api/playlist

//     Create a new playlist                       POST /api/playlist
router.route('/')
    .post(verifyRoles(ROLES_LIST.Member), playlistController.create);

//     Get playlists for user                      GET /api/playlist/user/{account_id}
router.route('/user/:account_id')
    .get(verifyRoles(ROLES_LIST.Member), playlistController.userPlaylists);

//     Get users queue                             GET /api/playlist/queue/{account_id}
router.route('/queue/:account_id')
    .get(verifyRoles(ROLES_LIST.Member), playlistController.userQueue);

//     Get single playlist                         GET /api/playlist/{playlist_id}
router.route('/:playlist_id')
    .get(verifyRoles(ROLES_LIST.Member), playlistController.show);

//     Update an existing playlist                 POST /api/playlist/{playlist_id}
router.route('/:playlist_id')
    .post(verifyRoles(ROLES_LIST.Member), playlistController.update);

//     Delete a playlist                           DELETE /api/playlist/{playlist_id}
router.route('/:playlist_id')
    .delete(verifyRoles(ROLES_LIST.Member), playlistController.remove);

//     Add story to playlist                       POST /api/playlist/{playlist_id}/story/{story_id}
router.route('/:playlist_id/story/:story_id')
    .post(verifyRoles(ROLES_LIST.Member), playlistController.addStory);

//     Remove story from playlist                  DELETE /api/playlist/{playlist_id}/story/{story_id}
router.route('/:playlist_id/story/:story_id')
    .delete(verifyRoles(ROLES_LIST.Member), playlistController.removeStory);

module.exports = router;