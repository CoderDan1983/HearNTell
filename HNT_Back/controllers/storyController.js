const Story = require('../model/Story');
const User = require('../model/User');
const Profile = require('../model/Profile')
const StoryRating = require('../model/StoryRating');
const Tag = require('../model/Tag');
const Playlist = require('../model/Playlist');
const { properlyUppercased } = require('../custom_modules/utilities') 
const fake = require("../../HNT_Front/src/components/fakeApi/fakeStories_Back");

// import { fakeStories, fakeStories1,  fakeTags, fakeSearches, fakeSubList, fakeBaskets, fakeQueue,
// } from '../../HNT_Front/src/components/fakeApi/fakeStories';

//* Gets a single story
const getStory = async (req, res) => {
  const story_id = req.params.story_id;
  console.log('getStory backend!  story_id is: ', story_id)

  // const story_id = req.body.story_id;
  const story = await Story.findOne({_id: story_id}).populate('creator');
  if (!story) return res.status(204).json({ 'message': 'No story found' });
  // // res.json(story);
  // const story = fake.fakeStories.filter((story)=>{
  //   return story._id === story_id;
  // });
  console.log('story is : ', story);

  if(Array.isArray(story)){
    res.json(story[0]);
  }
  else{
    res.json(story);
  }
}
const getStories = async (req, res) => {
  // const queryObj = req.query;
  // console.log('getStories backend!', queryObj);

  let stories = await Story.find({}).populate('creator');

  // if (!stories) return res.status(204).json({ 'message': 'No story found' });
  // // res.json(story);
  // const stories = fake.fakeStories;

  console.log('stories are: ');
  console.log(stories)
  res.json(stories);
}

let queryObj = {
  find: { name: "steve" },
  sort: { popularity: 1 }
}
const getStoriesBy = async (req, res) => {
  const query = req.query;
  const findBy = query.find? query.find : {};
  const limitBy = query.limit ? query.limit : 0;
  const sortBy = query.sort ? query.sort : {}; //* unsure about this ^_^
  console.log('backend for getStoriesBy !', query);

  let stories = await Story.find(findBy).populate('creator').sort(sortBy).limit(limitBy);

  // if (!stories) return res.status(204).json({ 'message': 'No story found' });
  // // res.json(story);
  // const stories = fake.fakeStories;

  console.log('stories are: ');
  console.log(stories)
  res.json(stories);
}



//* Create or update a single story
const saveStory = async (req, res) => {
  const user = await User.findOne({ username: req.user});
  const user_id = user._id;
  const body = req.body;
  const story_id = req.body.story_id;
  const { violenceRating, sexRating, languageRating, generalRating, 
    title, description, isPrivate, tags: rawTags, selectedFile, audioLink } = body;
  const duration = 1000; //todo later we'll get this value from the file length or whatnot.
  
  let jsonnedTags = JSON.parse(rawTags);
  const tags = jsonnedTags.map((tag)=> properlyUppercased(tag));

  tags.map(async (tag) => { //@ b) saving tags to tags collection (?)
      await Tag.findOneAndUpdate({ name: tag }, { name: tag }, { upsert: true});
  });

  const new_story_info = { //@ c) create the story on the database
    creator: user_id, title, description, isPrivate, tags, audioLink, duration, 
  };

  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  // const story = await Story.findOneAndUpdate({ _id: story_id}, new_story_info, options, function(error, result) {
  //     if (error) return;
  //     // do something with the document
  //     res.status(200);
  // });
  const story = await Story.findOneAndUpdate({ _id: story_id}, new_story_info, options).populate('creator');

  const rating_info = { user_id, story_id, violenceRating, sexRating, languageRating, generalRating }
  //?  They're only updating the rating they themselves are responsible for, right?
  let ratings = await StoryRating.findOneAndUpdate({ _id: story_id}, rating_info, options);
  
  res.json({ story, ratings });
}
//* Create a new story
const create = async (req, res) => {
  const user = await User.findOne({ username: req.user});
  const user_id = user._id;

  const body = req.body;
  const { violenceRating, sexRating, languageRating, generalRating, 
    title, description, isPrivate, tags: rawTags, selectedFile, audioLink } = body;
  const duration = 1000; //todo later we'll get this value from the file length or whatnot.
  
  // console.log('body: ', body, ', the user is: ', user, ", user_id is: ", user_id);
  // console.log('the name of the file is: ', req.files.file.name); //okay
  let jsonnedTags = JSON.parse(rawTags);
  const tags = jsonnedTags.map((tag)=> properlyUppercased(tag));

  // console.log('tags are: ', tags);

  tags.map(async (tag) => { //@ b) saving tags to tags collection (?)
      await Tag.findOneAndUpdate({ name: tag }, { name: tag }, { upsert: true});
  });

  const new_story_info = { //@ c) create the story on the database
    creator: user_id, title, description, isPrivate, tags, audioLink, duration, 
  };
  
  let story = await Story.create(new_story_info); 
  const story_id = story._id;
  console.log("story._id is: ", story._id); 
  //* When 'story' was changed to 'Story' in the Story.js's mongoose.modal('Story), 
  //...createdAt suddenly displays,
  //...and we can reference _id through story._id instead of story[0]._id! 
  // console.log(story[0].createdAt, story[0].updatedAt);
  console.log(story.createdAt, ", " + story.updatedAt);
  
  const rating_info = {  //@ d) create the ratings object in the database
    user_id, story_id, violenceRating, sexRating, languageRating, generalRating 
  } //* NOTE: enjoymentRating not put in by creator :D
  let ratings = await StoryRating.create(rating_info);
  
  // console.log("we'll be returning: ", story, ratings); //? Why do tags appear twice in story!?!
  res.json({ story, ratings }); //@ e) return values :)
};

//todo Get most popular stories for all tags
const popular = async (req, res) => {
  let stories = await Story.find({}).populate('creator') // sort by popularity_rating
  res.json(stories);
  //? calculate by popularity somewhere (?)
}; 

//todo Get most popular stories for a tag
const popularByTag = async (req, res) => {
  const { tags: rawTags } = req.params;
  let jsonnedTags = JSON.parse(rawTags);
  const tags = jsonnedTags.map((tag)=> properlyUppercased(tag));
  //? calculate by popularity somewhere (?)
  let stories = await Story.find({ tags }).populate('creator') // sort by popularity_rating
  res.json(stories);
};

//Search stories (tag, author, title)
const search = async (req, res) => {
  const search_string = req.params.search_string;

  //? Get tags that match
  const search_tags = [search_string]; //# search_string.split(",").trim();
  console.log('search_tags are: ', search_tags);
  let tag_stories = await Story.find({ tags: { $in: search_tags } }).populate('creator');
  console.log('tag_stories are: ', tag_stories);
  // .findOne( { topics : {$in: ['voyage', 'nautical']} }, { title: 1 } )
  //? Get creator accounts that match name
  //? there is no Creator model.  Did you mean User or Profile?
  let creator_accounts = await User.find({ name: search_string }); //Creator

  //? get titles that match
  let title_stories = await Story.find({ title: search_string }).populate('creator');

  let search_results = {
    tag_matched_stories: tag_stories,
    creator_account_matches: creator_accounts,
    title_matched_stories: title_stories
  }
  res.json(search_results);
};



//* Get stories by playlist
const storiesForPlaylist = async (req, res) => {
  const playlist_id = req.params.playlist_id;
  let playlist_stories = [];

  let playlist = await Playlist.findOne({ _id: playlist_id }); //* returns single playlist
  let playlist_story_ids = playlist.story_ids;

  playlist_story_ids.forEach(async (story_id) => {
    let story = await Story.findOne({ _id: story_id }).populate('creator');
    playlist_stories.push(story);
  });

  res.json(playlist_stories);
};

//0) playlist_id
//1) we get the playlist (an array of story_id 's) by its playlist_id

//* Get stories by creator
const storiesByCreator = async (req, res) => {
  const user = await User.findOne({ username: req.user });
  const user_id = user._id;
  console.log('storiesByCreator 184!')

  let stories = await Story.find({ creator: user_id }).populate('creator');
  console.log('user: ', user, ', stories: ', stories)
  res.json(stories);
};

//* Get single story
const show = async (req, res) => {
  const story_id = req.params.story_id;
  let story = await Story.findOne({_id: story_id}).populate('creator');

  res.json(story);
};

//* Update an existing story
const update = async (req, res) => {
  const user = await User.findOne({ username: req.user });
  const user_id = user._id;
  const story_id = req.params.story_id;

  const body = req.body;
  const { title, description, isPrivate, tags: rawTags, selectedFile, audioLink } = body;
  const duration = 1000; //todo later we'll get this value from the file length or whatnot.
  
  let jsonnedTags = JSON.parse(rawTags);
  const tags = jsonnedTags.map((tag)=> properlyUppercased(tag));

  tags.map(async (tag) => { //@ b) saving tags to tags collection (?)
    await Tag.findOneAndUpdate({ name: tag }, { name: tag }, { upsert: true});
  });

  const story_data = { //@ c) create the story on the database
    creator: user_id, title, description, isPrivate, tags, audioLink, duration, 
  };

  const story = await Story.findOneAndUpdate({ _id: story_id }, story_data, {upsert: true})
    .populate('creator');
  res.json(story);
};

//* Delete a story
const remove = async (req, res) => {
  const user = await User.findOne({ username: req.user});
  const user_id = user._id;

  const story_id = req.params.story_id;

  //? Do we want to make sure it's the right user who is deleting the story?  If not, 
  //... remove the user_id requirement!
  let story = await Story.findOneAndDelete({ _id: story_id }).populate('creator');
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




    
  //? Lonnie's Incoming 6/17
  // playlist_story_ids.forEach((story_id) => {
  //   // let story = await Story.findOne({_id: story_id});
  //   Story.findOne({_id: story_id})
  //   .then((story) => {
  //     playlist_stories.push(story);
  //   })
  // })
  // .then(() => {
  //   res.json(playlist_stories);
  // })