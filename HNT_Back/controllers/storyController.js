const Story = require('../model/Story');
const Tag = require('../model/Tag');
const Playlist = require('../model/Playlist');

const fake = require("../../HNT_Front/src/components/fakeApi/fakeStories_Back");

// import { fakeStories, fakeStories1,  fakeTags, fakeSearches, fakeSubList, fakeBaskets, fakeQueue,
// } from '../../HNT_Front/src/components/fakeApi/fakeStories';

//* Gets a single story
const getStory = async (req, res) => {
  console.log('getStory backend!')
  const story_id = req.params.story_id;
  //we are recieving the story_id :)
  console.log(story_id);
  // const story_id = req.body.story_id;
  // const story = await Story.findOne({_id: story_id});
  // if (!story) return res.status(204).json({ 'message': 'No story found' });
  // // res.json(story);
  const story = fake.fakeStories.filter((story)=>{
    return story._id === story_id;
  });
  console.log('story matching _id of ' + story_id + " are: ");
  console.log(story)
  res.json({"story": story });
}

const getStories = async (req, res) => {
  console.log('getStories backend!')
  
  // const story_id = req.body.story_id;
  // const story = await Story.findOne({_id: story_id});
  // if (!story) return res.status(204).json({ 'message': 'No story found' });
  // // res.json(story);
  const stories = fake.fakeStories;

  console.log('stories are: ');
  console.log(stories)
  res.json(stories);
}

//* Create or update a single story
const saveStory = async (req, res) => {
  const story_id = req.body.story_id;
  const new_story_info = {
      id: req.body.story_id,
      account_id: req.body.account_id,
      audio_url: req.body.audio_url,
      name: req.body.name,
      tag_names: req.body.tag_names, 
      description: req.body.description,
      duration: req.body.duration,
      private: req.body.private, 
    };

  // Find the document
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  const story = await Story.findOneAndUpdate({id: story_id}, new_story_info, options, function(error, result) {
      if (error) return;
      // do something with the document
      res.status(200);
  });

}

//* Create a new story
const create = async (req, res) => {

  const new_story_info = {
      id: req.body.story_id,
      account_id: req.body.account_id,
      audio_url: req.body.audio_url,
      name: req.body.name,
      tag_names: req.body.tag_names, 
      description: req.body.description,
      duration: req.body.duration,
      private: req.body.private, 
    };

  let story = await Story.create(new_story_info);
  res.json(story);
};

//* Get most popular stories for all tags
const popular = async (req, res) => {
  
  res.json('');
};

//* Get most popular stories for a tag
const popularByTag = async (req, res) => {

  res.json('');
};

//* Search stories (tag, author, title)
const search = async (req, res) => {

  res.json('');
};

//* Get stories by playlist
const storiesForPlaylist = async (req, res) => {
  const playlist_id = req.params.playlist_id;
  let playlist_stories = [];

  let playlist = await Playlist.findOne({_id: playlist_id});
  let playlist_story_ids = playlist.story_ids;

  playlist_story_ids.forEach(story_id => {
    let story = await Story.findOne({_id: story_id});
    playlist_stories.push(story);
  });
  
  res.json(playlist_stories);
};

//* Get stories by creator
const storiesByCreator = async (req, res) => {
  const creator_id = req.params.creator_id;
  let stories = await Story.find({account_id: creator_id});
  res.json(stories);
};

//* Get single story
const show = async (req, res) => {
  const story_id = req.params.story_id;
  let story = await Story.findOne({_id: story_id});
  res.json(story);
};

//* Update an existing story
const update = async (req, res) => {
  const story_id = req.params.story_id;
  const story_data = {
      id: req.body.story_id,
      account_id: req.body.account_id,
      audio_url: req.body.audio_url,
      name: req.body.name,
      tag_names: req.body.tag_names, 
      description: req.body.description,
      duration: req.body.duration,
      private: req.body.private, 
    };

  const story = await Story.findOneAndUpdate({_id: story_id}, story_data, {upsert: true});
  res.json(story);
};

//* Delete a story
const remove = async (req, res) => {
  const story_id = req.params.story_id;

  let story = await Story.findOneAndDelete({_id: story_id});
  res.json(story);
};

module.exports = {
  getStory,
  getStories,
  create,
  popular,
  popularByTag,
  search,
  storiesForPlaylist,
  storiesByCreator,
  show,
  update,
  remove
}


//* How should we calculate the most popular stories?

  // Total stars from all the ratings a story received?
    // Should we consider time, like the past 30 days?
