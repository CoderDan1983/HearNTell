const Tag = require('../model/Tag');
const Story = require('../model/Story');
const Campaign = require('../model/Campaign');

//* Get a single tag
const getTag = async (req, res) => {
  console.log('getTag backend!')
  const tag_id = req.params.tag_id;
  const tag = await Tag.findOne({_id: tag_id})
  res.json(tag);
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
  let tags = await Tag.find({ is_blocked: false })
  .populate('highest_bidder');
  res.json(tags);
};

//* Get a list of all tags including blocked
const adminIndex = async (req, res) => {
  console.log("Got to tag index");
  let tags = await Tag.find({})
  .populate('highest_bidder');
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
  let tag = await Tag.findOneAndUpdate({_id: tag_id}, tag_data, {upsert: true, new: true});
  res.json(tag);
};

//* Delete a tag
const remove = async (req, res) => {
  const tag_id = req.params.tag_id;
  let tag = await Tag.findOneAndDelete({_id: tag_id});
  console.log("Tag in controller", tag.name);
  //todo Find all stories with the tag and remove the tag from the story
  let stories = await Story.updateMany({}, { $pull: { tags: { $in: tag.name } }}); 
  console.log("Stories updated", stories);
  //todo Find all campaigns with the tag and remove the tag from the campaigns
  let campaigns = await Campaign.updateMany({}, { $pull: { tags: { $in: tag.name } }}); 
  res.json(tag);
};

//* Block a tag and remove it from stories and campaigns
const block = async (req, res) => {
  const tag_id = req.params.tag_id;
  let tag = await Tag.findOneAndUpdate({_id: tag_id}, {is_blocked: true}, {new: true});
  console.log("Tag in controller", tag.name);
  //todo Find all stories with the tag and remove the tag from the story
  let stories = await Story.updateMany({}, { $pull: { tags: { $in: tag.name } }}); 
  console.log("Stories updated", stories);
  //todo Find all campaigns with the tag and remove the tag from the campaigns
  let campaigns = await Campaign.updateMany({}, { $pull: { tags: { $in: tag.name } }}); 
  res.json(tag);
};

//* Block a tag and remove it from stories and campaigns
const unblock = async (req, res) => {
  const tag_id = req.params.tag_id;
  let tag = await Tag.findOneAndUpdate({_id: tag_id}, {is_blocked: false}, {new: true});
  res.json(tag);
};





module.exports = {
  create,
  index,
  adminIndex,
  tagsForStory,
  popular,
  getTag,
  update,
  remove,
  block,
  unblock
}