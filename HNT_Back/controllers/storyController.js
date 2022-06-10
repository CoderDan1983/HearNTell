const Story = require('../model/Story');
const fake = require("../../HNT_Front/src/components/fakeApi/fakeStories_Back")
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

  res.json('');
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

  res.json('');
};

//* Get stories by creator
const storiesByCreator = async (req, res) => {

  res.json('');
};

//* Get single story
const show = async (req, res) => {

  res.json('');
};

//* Update an existing story
const update = async (req, res) => {

  res.json('');
};

//* Delete a story
const remove = async (req, res) => {

  res.json('');
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



