const fake = require("../../HNT_Front/src/components/fakeApi/fakeStories_Back")
// import { fakeStories, fakeStories1,  fakeTags, fakeSearches, fakeSubList, fakeBaskets, fakeQueue,
// } from '../../HNT_Front/src/components/fakeApi/fakeStories';

//* Gets a single story
const getQueue = async (req, res) => {
  // console.log('getQueue backend!')
  const user_id = req.params.user_id;
  //we are recieving the story_id :)
  // console.log(user_id);
  // const story_id = req.body.story_id;
  // const story = await Story.findOne({_id: story_id});
  // if (!story) return res.status(204).json({ 'message': 'No story found' });
  // // res.json(story);
  const queue = fake.fakeQueue.filter((item)=>{
    return item.user_id === user_id;
  });
  
  // console.log('queue matching _id of ' + user_id + " are: ");
  // console.log(queue)
  res.json(queue[0]["queue"]);
}

module.exports = {
  getQueue,
}