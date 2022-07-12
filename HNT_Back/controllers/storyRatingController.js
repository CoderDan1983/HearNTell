const StoryRating = require('../model/StoryRating');

//* Create a new rating
const create = async (req, res) => {
  const rating_data = {
    story_id: req.body.story_id,
    user_id: req.body.user_id,
    time_stamp: req.body.time_stamp, //?
    enjoyment_rating: req.body.enjoyment_rating, 
    violence_rating: req.body.violence_rating,
    sexual_content_rating: req.body.sexual_content_rating,
    lanaguage_rating: req.body.lanaguage_rating,
    not_suitable_for_children_rating: req.body.not_suitable_for_children_rating
  };
  let rating = await StoryRating.create(rating_data);
  res.json(rating);
};

//* Get a single rating by story and user
const byAccountAndStory = async (req, res) => {
  const user_id = req.params.user_id;
  const story_id = req.params.story_id;
  let rating = await StoryRating.findOne({user_id: user_id, story_id: story_id});
  res.json(rating);
};

//* Get all the ratings for a story
const index = async (req, res) => {
  const story_id = req.params.story_id;
  let ratings = await StoryRating.find({story_id: story_id});
  res.json(ratings);
};

//* Get a story rating by id
const show = async (req, res) => {
  const story_rating_id = req.params.story_rating_id;
  let rating = await StoryRating.findOne({_id: story_rating_id});
  res.json(rating);
};

//* Update an existing rating
const update = async (req, res) => {
  const story_rating_id = req.params.story_rating_id;

  const rating_data = {
    story_id: req.body.story_id,
    user_id: req.body.user_id,
    time_stamp: req.body.time_stamp, //?
    enjoyment_rating: req.body.enjoyment_rating, 
    violence_rating: req.body.violence_rating,
    sexual_content_rating: req.body.sexual_content_rating,
    lanaguage_rating: req.body.lanaguage_rating,
    not_suitable_for_children_rating: req.body.not_suitable_for_children_rating
  };

  let rating = await StoryRating.findOneAndUpdate({_id: story_rating_id}, rating_data, {upsert: true, new: true});

  res.json(rating);
};

//* Delete a rating
const remove = async (req, res) => {
  const story_rating_id = req.params.story_rating_id;
  let rating = StoryRating.findByIdAndDelete({_id: story_rating_id});
  res.json(rating);
};


module.exports = {
  create,
  byUserAndStory,
  index,
  show,
  update,
  remove
}
