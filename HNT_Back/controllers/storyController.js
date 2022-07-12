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
//^ HELPERS
async function prepareStoryAndSetTags(req){
  const { _id: user_id } = await User.findOne({ username: req.user}); //@ a) set up basic variables

  //# const { playlist_id } = req.params;

  const { violenceRating, sexRating, languageRating, generalRating, 
    title, description, isPrivate, tags: rawTags, selectedFile, audioLink } = req.body;
  const duration = 1000; //todo later we'll get this value from the file length or whatnot.
  
  // console.log('body: ', body, ', the user is: ', user, ", user_id is: ", user_id);
  // console.log('the name of the file is: ', req.files.file.name); //okay
  let jsonnedTags = JSON.parse(rawTags);
  const tags = jsonnedTags.map((tag)=> properlyUppercased(tag));

  // console.log('tags are: ', tags);

  tags.map(async (tag) => { //@ b) saving tags to tags collection (?)
      await Tag.findOneAndUpdate({ name: tag }, { name: tag }, { upsert: true});
  });

    // if(playlist_id){ //* story_id as well as playlist_id would be needed here!!!
  //   let { story_ids } = await Playlist.findOne({ playlist_id });
  //   story_ids.push(story_id);
  //   const playlist = await Playlist.updateOne( { playlist_id }, { $set: { story_ids } } );
  // }  

  const story_info = { //@ c) create new_story_info object.
    creator: user_id, title, description, isPrivate, tags, audioLink, duration, 
  };

  const ratings_wo_story_id = {  //@ d) create the ratings object without the story id
    user_id, violenceRating, sexRating, languageRating, generalRating 
  } //* NOTE: enjoymentRating not put in by creator :D

  return { story_info, ratings_wo_story_id }
}

//* Gets a single story
const getStory = async (req, res) => {
  const story_id = req.params.story_id;

  const story = await Story.findOne({_id: story_id})
    .populate('creator', "username name")
    .populate("ratings");
  if (!story) return res.status(204).json({ 'message': 'No story found' });
  console.log('getStory backend!  story_id is: ', story_id, ', story is: ', story)

  if(Array.isArray(story)){
    res.json(story[0]);
  }
  else{
    res.json(story);
  }
}
const getStories = async (req, res) => {
  let stories = await Story.find({})
    .populate('creator', "username name")
    .populate("ratings");

  console.log('stories are: ');
  console.log(stories)

  if (!stories) return res.status(204).json({ 'message': 'No story found' });
  res.json(stories);
}

const getStoriesBy = async (req, res) => {
  const query = req.query;
  const findBy = query.find? query.find : {};
  const limitBy = query.limit ? query.limit : 0;
  const sortBy = query.sort ? query.sort : {}; //* unsure about this ^_^

  let stories = await Story.find(findBy)
    .populate('creator', "username name")
    .populate("ratings")
    .sort(sortBy).limit(limitBy);

  console.log('backend for getStoriesBy!  query is ', query, ", stories are ", stories);

  if (!stories) return res.status(204).json({ 'message': 'No story found' });

  res.json(stories);
}

//todo Get most popular stories for all tags
const popular = async (req, res) => {
  let stories = await Story.find({})
    .populate('creator', "username name")
    .populate("ratings"); // sort by popularity_rating
  res.json(stories);
  //? calculate by popularity somewhere (?)
}; 

//todo Get most popular stories for a tag
const popularByTag = async (req, res) => {
  const { tags: rawTags } = req.params;
  let jsonnedTags = JSON.parse(rawTags);
  const tags = jsonnedTags.map((tag)=> properlyUppercased(tag));
  //? calculate by popularity somewhere (?)
  let stories = await Story.find({ tags })
    .populate('creator', "username name")
    .populate("ratings"); // sort by popularity_rating
  res.json(stories);
};

//Search stories (tag, author, title)
const search = async (req, res) => {
  const search_string = req.params.search_string;

  //? Get tags that match
  const search_tags = [search_string]; //# search_string.split(",").trim();
  console.log('search_tags are: ', search_tags);
  let tag_stories = await Story.find({ tags: { $in: search_tags } })
    .populate('creator', "username name")
    .populate("ratings");
  console.log('tag_stories are: ', tag_stories);
  // .findOne( { topics : {$in: ['voyage', 'nautical']} }, { title: 1 } )
  //? Get creator accounts that match name
  //? there is no Creator model.  Did you mean User or Profile?
  let creator_accounts = await User.find({ name: search_string }); //Creator

  //? get titles that match
  let title_stories = await Story.find({ title: search_string })
    .populate('creator', "username name")
    .populate("ratings");

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
    let story = await Story.findOne({ _id: story_id })
      .populate('creator', "username name")
      .populate("ratings");
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
  //console.log('storiesByCreator 184!')

  let stories = await Story.find({ creator: user_id })
    .populate('creator', "username name")
    .populate("ratings");
  //console.log('user: ', user, ', stories: ', stories)
  res.json(stories);
};

//* Get single story
const show = async (req, res) => {
  console.log('storyController, show!')
  const story_id = req.params.story_id;
  let story = await Story.findOne({_id: story_id})
    .populate('creator', "username name")
    .populate("ratings");

  console.log('the story being returned is: ', story)
  res.json(story);
};

//* Create a new story
const create = async (req, res) => {
  const { story_info, ratings_wo_story_id } = await prepareStoryAndSetTags(req);
  
  const story = await Story.create(story_info)
  const rating_info = { ...ratings_wo_story_id, story_id: story._id }
  let ratings = await StoryRating.create(rating_info);
  
  //* make sure the story has the story ratings id!
  story.ratings = ratings._id;
  await story.save(); //await (?)

  // console.log("we'll be returning: ", story, ratings);
  res.json({ story, ratings }); //@ e) return values :)
};

//* Update an existing story
const update = async (req, res) => {
  console.log('storyController, update! body is: ', req.body)
  const { story_info, ratings_wo_story_id } = await prepareStoryAndSetTags(req);
  const story_id = req.params.story_id;
  const ratings_info = { ...ratings_wo_story_id, story_id }
  console.log('story_info is: ', story_info, ", ratings_info is: ", ratings_info);

  const story = await Story.findOneAndUpdate({ _id: story_id }, { $set: story_info }, {upsert: true, new: true})

  //* if upsert inserted a new document, it will return null!  
  //... (if so, create ratings obj and connect it to the story)   
  const ratings = await StoryRating.findOneAndUpdate({ story_id }, ratings_info, {upsert: true});
  
  const { newDoc, newDependant } = await afterUpdateFixConnectorIfMismatched(
    story, ratings, Story, StoryRating, { _id: story_id }, { story_id }, "ratings");

  const sendStory = newDoc ? newDoc : story;
  const sendRatings = newDependant ? newDependant : ratings;
  console.log('241.  sendStory: ', sendStory, ', sendRatings: ', sendRatings);
  res.json({ story: sendStory, ratings: sendRatings });
};

//* NOTE: this function runs on the assumption that upsert is true, and that a "created" update 
//... will return null if a new document was created!
async function afterUpdateFixConnectorIfMismatched(doc, dependent, schema, depSchema, docQuery, depQuery, connectorProp){
  if((!doc)||(!dependent)||(!doc[connectorProp])){ //* make sure the story has the story ratings id!
    const newDoc = await schema.findOne(docQuery);
    const newDependant = await depSchema.findOne(depQuery);
    newDoc[connectorProp] = newDependant._id;
    await newDoc.save();

    return { newDoc, newDependant }
  }
  return {}; //* if no new changes, return empty :)
}


// //* Create or update a single story
// const saveStory = async (req, res) => { //SKIPPING SAVE!!!
//   console.log('how did we end up at saveStory!?!?')
//   const { story_info, ratings_wo_story_id } = await prepareStoryAndSetTags(req);
//   const story_id = req.body.story_id;
//   const ratings_info = { ...ratings_wo_story_id, story_id }

//   const options = { upsert: true, new: true, setDefaultsOnInsert: true,  };
//   const story = await Story.findOneAndUpdate({ _id: story_id}, story_info, options)
//   let ratings = await StoryRating.findOneAndUpdate({ story_id }, ratings_info, options);
  
//   if((!story)||(!ratings)||(!story.ratings)){ //* make sure the story has the story ratings id!
//     const newStory = await Story.findOne({ _id: story_id });
//     const newRatings = await StoryRating.findOne({ story_id });
//     newStory.ratings = newRatings._id;
//     await newStory.save();
//   }

//   res.json({ story, ratings });
// }

// async function deleteAStory(req){

// }
//* Delete a story
const remove = async (req, res) => {
  console.log('storyController 261, remove!')
  const { _id: user_id } = await User.findOne({ username: req.user}); //* 0) getting user_id
  const { story_id } = req.params; //* playlist is undefined :)
  console.log('in delete we have ids for user, and story_id : ', user_id, story_id) //$ the rating with this story_id not deleted!

  // //* 1) delete story from all playlists that contain it :)
  let releventPlaylists = await Playlist.find({ story_ids: { $in: story_id } });  //* 1) getting relevant playlists
  for(let r=0; r < releventPlaylists.length; r++){ //* 1.1) updating relavent playlists.
    const playlist = releventPlaylists[r];
    const playlist_id = playlist._id;
    const story_ids = playlist["story_ids"].filter((item)=>{
      // console.log(item + ' vs ' + story_id)
      return item !== story_id;
    });
    playlist.story_ids = story_ids;
    await playlist.save();
    // await Playlist.findOneAndUpdate({ playlist_id }, { $set: { story_ids } });
    //ex: updateOne({ _id: doc._id }, { $set: { name: 'foo' } })`
  };

  console.log('releventPlaylists is: ', releventPlaylists);

  //* 2) deleting story in Story, returning removed story
  const story = await Story.findOneAndDelete({ _id: story_id })
    .populate('creator', "username name")
    .populate("ratings");
  console.log('storyController, remove function. the story with story_id ', story_id,
  ' was found in the following playlists: ', releventPlaylists, ', story is: ', story);

  
  //* 3) deleting a story's ratings //# _id: story.ratings._id
  const ratings = story.ratings ? await StoryRating.findOneAndDelete({ story_id }) : {};
  res.json({ story, ratings });
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


//# old version   //* Create or update a single story
// const saveStory = async (req, res) => { //SKIPPING SAVE!!!
//   const { _id: user_id } = await User.findOne({ username: req.user});

//   const story_id = req.body.story_id;
//   const { violenceRating, sexRating, languageRating, generalRating, 
//     title, description, isPrivate, tags: rawTags, selectedFile, audioLink } = req.body;
//   const duration = 1000; //todo later we'll get this value from the file length or whatnot.
  
//   let jsonnedTags = JSON.parse(rawTags);
//   const tags = jsonnedTags.map((tag)=> properlyUppercased(tag));

//   tags.map(async (tag) => { //@ b) saving tags to tags collection (?)
//       await Tag.findOneAndUpdate({ name: tag }, { name: tag }, { upsert: true});
//   });

//   const new_story_info = { //@ c) create the story on the database
//     creator: user_id, title, description, isPrivate, tags, audioLink, duration, 
//   };

//   const options = { upsert: true, new: true, setDefaultsOnInsert: true };
//   // const story = await Story.findOneAndUpdate({ _id: story_id}, new_story_info, options, function(error, result) {
//   //     if (error) return;
//   //     // do something with the document
//   //     res.status(200);
//   // });
//   const story = await Story.findOneAndUpdate({ _id: story_id}, new_story_info, options)
//     .populate('creator', "username name")
//     .populate("ratings");

//   const rating_info = { user_id, story_id, violenceRating, sexRating, languageRating, generalRating }
//   //?  They're only updating the rating they themselves are responsible for, right?
//   let ratings = await StoryRating.findOneAndUpdate({ _id: story_id}, rating_info, options);
  
//   res.json({ story, ratings });
// }

//# old version //* Update an existing story
// const update = async (req, res) => {
//   const { _id: user_id } = await User.findOne({ username: req.user });
//   const story_id = req.params.story_id;

//   const { violenceRating, sexRating, languageRating, generalRating, 
//     title, description, isPrivate, tags: rawTags, selectedFile, audioLink } = req.body;
//   const duration = 1000; //todo later we'll get this value from the file length or whatnot.
//   console.log('update an existing story.  body is: ', body);

//   //* MAKE SURE YOU DON"T REPLACE A SELECTED FILE with Null by accident!!!
//   let jsonnedTags = JSON.parse(rawTags);
//   const tags = jsonnedTags.map((tag)=> properlyUppercased(tag));

//   tags.map(async (tag) => { //@ b) saving tags to tags collection (?)
//     await Tag.findOneAndUpdate({ name: tag }, { name: tag }, { upsert: true});
//   });

//   const story_data = { //@ c) create the story on the database
//     creator: user_id, title, description, isPrivate, tags, audioLink, duration, 
//   };
//   const story = await Story.findOneAndUpdate({ _id: story_id }, { $set: story_data }, {upsert: true})
//     //.populate('creator', "username name")
//     // .populate("ratings");

//   const rating_info = {  //@ d) create the ratings object in the database
//     user_id, story_id, violenceRating, sexRating, languageRating, generalRating 
//   } //* NOTE: enjoymentRating not put in by creator :D
//   let ratings = await StoryRating.create(rating_info);

//   res.json({ story, ratings });
// };


//# old version ^_^   //* Create a new story
// const create = async (req, res) => {
//   const { _id: user_id } = await User.findOne({ username: req.user});

//   //# const { playlist_id } = req.params;
//   const body = req.body;
//   const { violenceRating, sexRating, languageRating, generalRating, 
//     title, description, isPrivate, tags: rawTags, selectedFile, audioLink } = body;
//   const duration = 1000; //todo later we'll get this value from the file length or whatnot.
  
//   // console.log('body: ', body, ', the user is: ', user, ", user_id is: ", user_id);
//   // console.log('the name of the file is: ', req.files.file.name); //okay
//   let jsonnedTags = JSON.parse(rawTags);
//   const tags = jsonnedTags.map((tag)=> properlyUppercased(tag));

//   // console.log('tags are: ', tags);

//   tags.map(async (tag) => { //@ b) saving tags to tags collection (?)
//       await Tag.findOneAndUpdate({ name: tag }, { name: tag }, { upsert: true});
//   });

//   const new_story_info = { //@ c) create the story on the database
//     creator: user_id, title, description, isPrivate, tags, audioLink, duration, 
//   };
  
//   let story = await Story.create(new_story_info)
//     .populate('creator', "username name")
//     // .populate("ratings");
//   const story_id = story._id;
//   console.log("story._id is: ", story._id); //, ', playlist_id is: ', playlist_id

//   // if(playlist_id){
//   //   let { story_ids } = await Playlist.findOne({ playlist_id });
//   //   story_ids.push(story_id);
//   //   const playlist = await Playlist.updateOne( { playlist_id }, { $set: { story_ids } } );
//   // }  

//   const rating_info = {  //@ d) create the ratings object in the database
//     user_id, story_id, violenceRating, sexRating, languageRating, generalRating 
//   } //* NOTE: enjoymentRating not put in by creator :D
//   let ratings = await StoryRating.create(rating_info);
  
//   // console.log("we'll be returning: ", story, ratings); //? Why do tags appear twice in story!?!
//   res.json({ story, ratings }); //@ e) return values :)
// };