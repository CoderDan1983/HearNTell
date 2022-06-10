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
  const request_data = req.body;
  let playlist_data = {
    account_id: request_data.account_id,
    story_ids: request_data.story_ids, // expects an array
    Name: request_data.name,
    description: request_data.description,
    is_queue: request_data.is_queue,
  };
  let playlist = await Playlist.create(playlist_data);
  res.json(playlist);
};

//* Get playlists for user
const userPlaylists = async (req, res) => {
  const account_id = req.params.account_id;
  let playlists = await Playlist.find({account_id: account_id});
  res.json(playlists);
};

//* Get user's queue
const userQueue = async (req, res) => {
  const account_id = req.params.account_id;
  let queue = Playlist.findOne({account_id: account_id, is_queue: true})
  res.json(queue);
};

//* Get single playlist
const show = async (req, res) => {
  const playlist_id = req.params.playlist_id;
  let playlist = await Playlist.findOne({_id: playlist_id});
  res.json(playlist);
};

//* Update an existing playlist
const update = async (req, res) => {
  const playlist_id = req.params.playlist_id;
  let playlist_data = {
    account_id: request_data.account_id,
    story_ids: request_data.story_ids, // expects an array
    Name: request_data.name,
    description: request_data.description,
    is_queue: request_data.is_queue,
  };
  let playlist = await Playlist.findOneAndUpdate({_id: playlist_id}, playlist_data);
  res.json(playlist);
};

//* Add story to playlist
const addStory = async (req, res) => {
  const playlist_id = req.params.playlist_id;
  const story_id = req.params.story_id;

  let playlist = await Playlist.findOne({_id: playlist_id});
  let story_ids = playlist.story_ids;

  story_ids.push(story_id);
  playlist.story_ids = story_ids;
  playlist.save();
  res.json(playlist);
};

//* Remove story from playlist
const removeStory = async (req, res) => {
  const playlist_id = req.params.playlist_id;
  const story_id = req.params.story_id;

  let playlist = await Playlist.findOne({_id: playlist_id});
  let story_ids = playlist.story_ids;

  let updated_story_ids = story_ids.filter(e => !== story_id)

  playlist.story_ids = updated_story_ids;
  playlist.save()
  res.json(playlist);
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

