const fake = require("../../HNT_Front/src/components/fakeApi/fakeStories_Back")
// import { fakeStories, fakeStories1,  fakeTags, fakeSearches, fakeSubList, fakeBaskets, fakeQueue,
// } from '../../HNT_Front/src/components/fakeApi/fakeStories';

//* Gets a single story
const getListenerSubscription = async (req, res) => {
  console.log('getListenerSubscription backend!')
  const sub_id = req.params.sub_id;
  //we are recieving the story_id :)
  console.log(sub_id);
  // const story_id = req.body.story_id;
  // const story = await Story.findOne({_id: story_id});
  // if (!story) return res.status(204).json({ 'message': 'No story found' });
  // // res.json(story);
  const subscriptions = fake.fakeSubList.filter((sub)=>{
    return sub.user_id === sub_id;
  });
  
  // console.log('subscriptions matching _id of ' + sub_id + " are: ");
  // console.log(subscriptions)
  res.json(subscriptions[0]["sublist"]);
}

module.exports = {
  getListenerSubscription,
}