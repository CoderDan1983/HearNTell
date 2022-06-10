const Tag = require('../model/Tag');

const fake = require("../../HNT_Front/src/components/fakeApi/fakeStories_Back")
// import { fakeStories, fakeStories1,  fakeTags, fakeSearches, fakeSubList, fakeBaskets, fakeQueue,
// } from '../../HNT_Front/src/components/fakeApi/fakeStories';

//* Get a single tag
const getTag = async (req, res) => {
  console.log('getTag backend!')
  const tag_id = req.params.tag_id;
  //we are recieving the story_id :)
  console.log(tag_id);
  // const story_id = req.body.story_id;
  // const story = await Story.findOne({_id: story_id});
  // if (!story) return res.status(204).json({ 'message': 'No story found' });
  // // res.json(story);
  const tags = fake.fakeTags.filter((tag)=>{
    return tag._id === tag_id;
  });
  
  console.log('tags matching _id of ' + tag_id + " are: ");
  console.log(tags)
  res.json(tags);
}


//* Create a new tag
const create = async (req, res) => {

  res.json('');
};

//* Get a list of all tags
const index = async (req, res) => {

  res.json('');
};

//* Get all the tags for a specific story
const tagsForStory = async (req, res) => {

  res.json('');
};

//* Get most popular tags
const popular = async (req, res) => {

  res.json('');
};

//* Update an existing tag
const update = async (req, res) => {

  res.json('');
};

//* Delete a tag
const remove = async (req, res) => {

  res.json('');
};




module.exports = {
  create,
  index,
  tagsForStory,
  popular,
  getTag,
  update,
  remove
}