const express = require('express');
const router = express.Router();
const playlistController = require('../../controllers/playlistController.js');

router.get('/:playlist_id', playlistController.getPlaylist);

module.exports = router;



//todo PLAYLIST Routes /api/playlist

//     Create a new playlist                       POST /api/playlist

//     Get playlists for user                      GET /api/playlist/user/{user_id}

//     Get users queue                             GET /api/playlist/queue/{user_id}

//     Get single playlist                         GET /api/playlist/{playlist_id}

//     Update an existing playlist                 POST /api/playlist/{playlist_id}

//     Delete a playlist                           DELETE /api/playlist/{playlist_id}

//     Add story to playlist                       POST /api/playlist/{playlist_id}/story/{story_id}

//     Remove story from playlist                  DELETE /api/playlist/{playlist_id}/story/{story_id}