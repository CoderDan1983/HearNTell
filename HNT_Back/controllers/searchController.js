const fake = require("../../HNT_Front/src/components/fakeApi/fakeStories_Back")
// import { fakeStories, fakeStories1,  fakeTags, fakeSearches, fakeSubList, fakeBaskets, fakeQueue,
// } from '../../HNT_Front/src/components/fakeApi/fakeStories';
console.log('search controller!')
//* Gets a single story
const getSearch = async (req, res) => {
  // console.log('getSearch backend!')
  const search_id = req.params.search_id;
  //we are recieving the story_id :)
  // console.log(search_id);
  // const story_id = req.body.story_id;
  // const story = await Story.findOne({_id: story_id});
  // if (!story) return res.status(204).json({ 'message': 'No story found' });
  // // res.json(story);

  const searches = fake.fakeSearches.filter((search)=>{
    return search.user_id === search_id;
  });
  
  // console.log('searches matching _id of ' + search_id + " are: ");
  // console.log(searches)
  res.json(searches[0]["searches"]);
}

module.exports = {
  getSearch,
}