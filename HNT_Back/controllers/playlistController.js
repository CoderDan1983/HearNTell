const Playlist = require('../model/Playlist');
const User = require('../model/User');
const fake = require("../../HNT_Front/src/components/fakeApi/fakeStories_Back");
const Story = require('../model/Story');

//* Gets a single story
const getMyBaskets = async (req, res) => {
  // console.log('getPlaylist backend!')  //thus far :)
  const playlist_id = req.params.playlist_id;
  //we are recieving the story_id :)
  // console.log(playlist_id);
  // const story_id = req.body.story_id;
  // const story = await Story.findOne({_id: story_id});
  // if (!story) return res.status(204).json({ 'message': 'No story found' });
  // // res.json(story);
  // const playlists = fake.fakeBaskets.filter((basket)=>{
  //   return basket.user_id === playlist_id; //"www"
  // });

  const returnThis = playlists[0]?.playlists ? playlists[0]["playlists"] : [];
  // console.log('playlist is: ', playlist);

  res.json(returnThis); //sending correct info, I believe :)
}


//* Gets a single story
const getPlaylist = async (req, res) => {
  console.log('getPlaylist backend!')  //thus far :)
  const playlist_id = req.params.playlist_id;
  //we are recieving the story_id :)
  // console.log(playlist_id);
  // const story_id = req.body.story_id;
  // const story = await Story.findOne({_id: story_id});
  // if (!story) return res.status(204).json({ 'message': 'No story found' });
  // // res.json(story);
  const playlists = fake.fakePlaylist.filter((playlist)=>{
    return playlist._id === playlist_id; //"www"
  });
  
  const story_ids = playlists.length ? playlists[0]["story_ids"] : [];

  const playlist = fake.fakeStories.filter((story) => {
    return story_ids.includes(story._id);
  });

  // console.log('playlist is: ', playlist);

  res.json(playlist); //sending correct info, I believe :)
}

//* Create a new playlist
const create = async (req, res) => {
  console.log('playlistController, create function!')
  const request_data = req.body;
  // console.log('body is: ', request_data);
  const user = await User.findOne({ username: req.user });
  console.log('user._id is: ', user._id);

  let playlist_data = {
    user_id: user._id,
    story_ids: request_data.story_ids, // expects an array
    title: request_data.title,
    description: request_data.description,
    is_queue: request_data.is_queue,
  };
  let playlist = await Playlist.create(playlist_data);
  console.log('playlist is : ', playlist)
  res.json(playlist);
};

//* Get playlists for user
const userPlaylists = async (req, res) => {
  const { _id: user_id } = await User.findOne({ username: req.user });
  let playlists = await Playlist.find({ user_id });
  console.log('73.  userPlaylists.  playlists is: ', playlists, ", user_id is: ", user_id)

  res.json(playlists);
};

//* Get user's queue
const userQueue = async (req, res) => {
  // const user_id = req.params.user_id;
  // console.log('user is: ', req.user);
  const { _id: user_id } = await User.findOne({ username: req.user });
  
  const queue = await Playlist.findOne({ user_id: user_id, is_queue: true })
  console.log('85.  userQueue.  queue is: ', queue)
  queue && res.json(queue);
  !queue && res.status(204).json({ 'message': 'No queue found' });
};

//* Get single playlist
const show = async (req, res) => {
  const playlist_id = req.params.playlist_id;
  console.log('playlistController 94, show request.  playlist_id is: ', playlist_id)
  let playlist = await Playlist.findOne({_id: playlist_id});
  let stories = [];
  if(playlist && playlist.story_ids){
    for(let i=0; i < playlist.story_ids.length; i++){
      const story_id = playlist.story_ids[i];
      const result = await Story.findOne({ _id: story_id });
      stories.push(result);
    }
  } 
  console.log(playlist, stories);
  res.json({ playlist, stories });
};

//* Update an existing playlist
const update = async (req, res) => {
  const playlist_id = req.params.playlist_id;
  let playlist_data = {
    user_id: request_data.user_id,
    story_ids: request_data.story_ids, // expects an array
    title: request_data.title,
    description: request_data.description,
    is_queue: request_data.is_queue,
  };
  let playlist = await Playlist.findOneAndUpdate({_id: playlist_id}, playlist_data);
  res.json(playlist);
};

const remove = async (req, res) => {
  const playlist_id = req.params.playlist_id;
  let playlist = await Playlist.findOneAndDelete({_id: playlist_id});
  res.json(playlist);
}

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
  let updated_story_ids = story_ids.filter(id => id !== story_id);

  playlist.story_ids = updated_story_ids;
  playlist.save()
  res.json(playlist);
};


module.exports = {
  getPlaylist,
  getMyBaskets,
  create,
  userPlaylists,
  userQueue,
  show,
  update,
  remove,
  addStory,
  removeStory
}

