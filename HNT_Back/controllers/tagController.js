const Tag = require('../model/Tag');
const Story = require('../model/Story');


const fake = require("../../HNT_Front/src/components/fakeApi/fakeStories_Back")
// import { fakeStories, fakeStories1,  fakeTags, fakeSearches, fakeSubList, fakeBaskets, fakeQueue,
// } from '../../HNT_Front/src/components/fakeApi/fakeStories';

//* Get a single tag
const getTag = async (req, res) => {
  console.log('getTag backend!')
  const tag_id = req.params.tag_id;
  //we are recieving the story_id :)
  // console.log(tag_id);
  // const story_id = req.body.story_id;
  // const story = await Story.findOne({_id: story_id});
  // if (!story) return res.status(204).json({ 'message': 'No story found' });
  // // res.json(story);
  const tags = fake.fakeTags.filter((tag)=>{
    return tag._id === tag_id;
  });
  
  // console.log('tags matching _id of ' + tag_id + " are: ");
  // console.log(tags)
  res.json(tags);
}


//* Create a new tag
const create = async (req, res) => {
  const tag_data = {
    name: req.body.name,
    highest_bid: req.body.highest_bid,
    highest_bidder_id: req.body.highest_bidder_id,
  };
  let tag = await Tag.create(tag_data);
  res.json(tag);
};

//* Get a list of all tags
const index = async (req, res) => {
  console.log("Got to tag index");
  let tags = await Tag.find({});
  res.json(tags);
};

//* Get all the tags for a specific story
const tagsForStory = async (req, res) => {
  let story_tags = [];
  const story_id = req.params.story_id;
  let story = await Story.findOne({_id: story_id});
  let tag_names = story.tag_names;
  tag_names.forEach(async tag_name => {
      let tag = await Tag.findOne({name: tag_name});
      story_tags.push(tag);
  });
  res.json(story_tags);
};

//* Get most popular tags
const popular = async (req, res) => {
  //todo sort by popularity
  res.json('');
};

//* Update an existing tag
const update = async (req, res) => {
  const tag_id = req.params.tag_id;
  const tag_data = {
    name: req.body.name,
    highest_bid: req.body.highest_bid,
    highest_bidder_id: req.body.highest_bidder_id,
  };
  let tag = await Tag.findOneAndUpdate({_id: tag_id}, tag_data, {upsert: true});
  res.json(tag);
};

//* Delete a tag
const remove = async (req, res) => {
  const tag_id = req.params.tag_id;
  let tag = await Tag.findOneAndDelete({_id: tag_id});
  res.json(tag);
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