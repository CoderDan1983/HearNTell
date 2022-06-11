const fake = require("../../HNT_Front/src/components/fakeApi/fakeStories_Back")
// import { fakeStories, fakeStories1,  fakeTags, fakeSearches, fakeSubList, fakeBaskets, fakeQueue,
// } from '../../HNT_Front/src/components/fakeApi/fakeStories';

//* Gets a single story
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

module.exports = {
  getTag,
}