const Playlist = require('../model/Playlist');


const fake = require("../../HNT_Front/src/components/fakeApi/fakeStories_Back")
// import { fakeStories, fakeStories1,  fakeTags, fakeSearches, fakeSubList, fakeBaskets, fakeQueue,
// } from '../../HNT_Front/src/components/fakeApi/fakeStories';

//* Gets a single story
const getPlaylist = async (req, res) => {
  console.log('getPlaylist backend!')
  const playlist_id = req.params.playlist_id;
  //we are recieving the story_id :)
  console.log(playlist_id);
  // const story_id = req.body.story_id;
  // const story = await Story.findOne({_id: story_id});
  // if (!story) return res.status(204).json({ 'message': 'No story found' });
  // // res.json(story);
  const playlists = fake.fakeBaskets.filter((playlist)=>{
    return playlist.user_id === playlist_id;
  });
  
  // console.log('playlists matching _id of ' + playlist_id + " are: ");
  // console.log(playlists)
  res.json(playlists[0]["playlists"]);
}

//* Create a new playlist
const create = async (req, res) => {

  res.json('');
};

//* Get playlists for user
const userPlaylists = async (req, res) => {

  res.json('');
};

//* Get user's queue
const userQueue = async (req, res) => {

  res.json('');
};

//* Get single playlist
const show = async (req, res) => {

  res.json('');
};

//* Update an existing playlist
const update = async (req, res) => {

  res.json('');
};

//* Add story to playlist
const addStory = async (req, res) => {

  res.json('');
};

//* Remove story from playlist
const removeStory = async (req, res) => {

  res.json('');
};

//* Subscription requests pending
const subscrptionsPending = async (req, res) => {

  res.json('');
};

module.exports = {
  getPlaylist,
  create,
  userPlaylists,
  userQueue,
  show,
  update,
  remove,
  addStory,
  removeStory
}

