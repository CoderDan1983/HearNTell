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
    creator: user._id,
    story_ids: request_data.story_ids, // expects an array
    title: request_data.title,
    description: request_data.description,
    is_queue: request_data.is_queue,
    is_creator_list: request_data.is_creator_list,
  };
  let playlist = await Playlist.create(playlist_data);
  console.log('playlist is : ', playlist)
  res.json(playlist);
};

const remove = async (req, res) => { //* remove a playlist!
  const playlist_id = req.params.playlist_id;
  console.log('removing playlist.  playlist_id is: ', playlist_id);
  let playlist = await Playlist.findOneAndDelete({_id: playlist_id});
  res.json(playlist);
  // res.json({ testing: "testing" })
}

//* Get playlists for user NOTE: (can now grab queue!)
const userPlaylists = async (req, res) => {
  const { _id: user_id } = await User.findOne({ username: req.user });
  const grab_type = req.params.grab_type || "named_playlists";
  
  let findObj = {};
  if (grab_type === "queue") { findObj = { user_id, is_queue: true } }
  else if (grab_type === "named_playlists") { findObj = { user_id, is_queue: false } }
  else if (grab_type === "all") { findObj = { user_id } }

  let playlists = await Playlist.find(findObj)
    .populate("creator", "username name");
  //console.log('73.  userPlaylists. user_id is: ', user_id, ', and grab_type is: ', grab_type);
  for(let p=0; p < playlists.length; p++){
    console.log(playlists[p].title + " is in playlists");
  }
  res.json(playlists);
};

//* Get playlists for creator
const creatorPlaylists = async (req, res) => {
  const { creator_id } = req.params;
  
  console.log('creatorPlaylists, 94')
  let findObj = { user_id: creator_id, is_queue: false, is_creator_list: true }

  let playlists = await Playlist.find(findObj)
    .populate("creator", "username name");
  for(let p=0; p < playlists.length; p++){
    console.log(playlists[p].title + " is in playlists");
  }
  res.json(playlists);
};

//* Get user's queue
const userQueue = async (req, res) => {
  // const user_id = req.params.user_id;
  // console.log('user is: ', req.user);
  const { _id: user_id } = await User.findOne({ username: req.user });
  let stories = [];
  let queue = await Playlist.findOne({ user_id: user_id, is_queue: true })
    .populate("creator", "username name");

  console.log('userQueue!  queue and user_id are: ', queue, user_id)
  if((!queue)&&(user_id)){ //* creates the queue if it doesn't exists!!!
    console.log('creating queue!')
    queue = await Playlist.create({
      user_id,
      creator: user_id,
      story_ids: [],
      title: 'Queue',
      description: 'Queue',
      is_queue: true,
    });
  }

  for(let i=0; i < queue.story_ids.length; i++){ //* grab the stories that go in the queue!
    const story_id = queue.story_ids[i];
    const result = await Story.findOne({ _id: story_id })
      .populate('creator', "username name")
      .populate("ratings");
    stories.push(result);
  }

  //console.log('85.  userQueue.  queue is: ', queue, ', stories are : ', stories);
  queue && res.json({ queue, stories });
  !queue && res.status(204).json({ 'message': 'No queue found' });
};

//* Get single playlist
const show = async (req, res) => {
  const playlist_id = req.params.playlist_id;
  console.log('playlistController 94, show request.  playlist_id is: ', playlist_id)
  let playlist = await Playlist.findOne({_id: playlist_id})
    .populate("creator", "username name");
  let stories = [];
  if(playlist && playlist.story_ids){
    for(let i=0; i < playlist.story_ids.length; i++){
      const story_id = playlist.story_ids[i];
      const result = await Story.findOne({ _id: story_id })
        .populate('creator', "username name")
        .populate("ratings");
      stories.push(result);
    }
  } 
  console.log(playlist, stories);
  res.json({ playlist, stories });
};

//* Update an existing playlist
const update = async (req, res) => {
  console.log('updating existing playlist!')
  const playlist_id = req.params.playlist_id;
  let playlist_data = {
    user_id: request_data.user_id,
    creator: request_data.user_id,
    story_ids: request_data.story_ids, // expects an array
    title: request_data.title,
    description: request_data.description,
    is_queue: request_data.is_queue,
  };
  let playlist = await Playlist.findOneAndUpdate({_id: playlist_id}, playlist_data, {new: true})
    .populate("creator", "username name");
  res.json(playlist);
};

//* Add story to playlist
const addStory = async (req, res) => {
  const { _id: user_id } = await User.findOne({ username: req.user}); //@ a) set up basic variables
  console.log('playlistController 150, addStory!'); //$ AddEditStory test: thus far!
  const { playlist_id, story_id } = req.params;
  const request_data = req.body;
  console.log('playlist_id is ', playlist_id, ', story_id is ', story_id, ", user_id is: ", user_id);
  console.log('req.body is: ', req.body);
  const playlist_data = {
    user_id,
    story_ids: request_data.story_ids, // expects an array
    title: request_data.title,
    description: request_data.description,
    is_queue: request_data.is_queue,
    is_creator_list: request_data.is_creator_list,
  }

  let playlist = await Playlist.findOne({_id: playlist_id})
    .populate("creator", "username name");
  (!playlist) && await Playlist.create(playlist_data); //* create playlist if it doesn't exist
  let story_ids = playlist.story_ids;

  const alreadyAdded = story_ids.includes(story_id);
  !alreadyAdded && story_ids.push(story_id) && console.log('adding story to playlist!');
  alreadyAdded && console.log('story had already been added to the playlist!');
  playlist.story_ids = story_ids;
  playlist.save();

  res.json(playlist);
};

//* Remove story from playlist
const removeStory = async (req, res) => {
  const { playlist_id, story_id } = req.params;
  console.log('playlistController!  removeStory!  params are: ', req.params);
  console.log('body is: ', req.body);

  let playlist = await Playlist.findOne({_id: playlist_id})
    .populate("creator", "username name");
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
  creatorPlaylists,
  userPlaylists,
  userQueue,
  show,
  update,
  remove,
  addStory,
  removeStory
}

