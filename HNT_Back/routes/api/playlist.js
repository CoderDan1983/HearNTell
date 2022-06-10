const express = require('express');
const router = express.Router();
const playlistController = require('../../controllers/playlistController.js');


//* PLAYLIST Routes /api/playlist

//     Create a new playlist                       POST /api/playlist
router.post('/', playlistController.create);

//     Get playlists for user                      GET /api/playlist/user/{account_id}
router.get('/user/:account_id', playlistController.userPlaylists);

//     Get users queue                             GET /api/playlist/queue/{account_id}
router.get('/queue/:account_id', playlistController.userQueue);

//     Get single playlist                         GET /api/playlist/{playlist_id}
router.get('/:playlist_id', playlistController.show);

//     Update an existing playlist                 POST /api/playlist/{playlist_id}
router.post('/:playlist_id', playlistController.update);

//     Delete a playlist                           DELETE /api/playlist/{playlist_id}
router.delete('/:playlist_id', playlistController.remove);

//     Add story to playlist                       POST /api/playlist/{playlist_id}/story/{story_id}
router.post('/:playlist_id/story/:story_id', playlistController.addStory);

//     Remove story from playlist                  DELETE /api/playlist/{playlist_id}/story/{story_id}
router.delete('/:playlist_id/story/:story_id', playlistController.removeStory);

module.exports = router;