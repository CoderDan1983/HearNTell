//* Rating by one listener of a story. These should be averaged for each story to be displayed in the story show view.

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const StoryRating = new Schema({
  story_id: String, //todo
  user_id: String, //* The user account that created the rating.
  violenceRating: Number,
  sexRating: Number,
  languageRating: Number,
  generalRating: Number,
  enjoymentRating: Number,
});
// const StoryRating = new Schema({
//   story_id: String,
//   account_id: String, //* The user account that created the rating.
//   time_stamp: Date, //* for adding up the ratings for the last week (7 days). May be built-in though.
//   //* Ratings should be whole numbers between 0 and 5 to correspond with the star rating system.
//   enjoyment_rating: Number, 
//   violence_rating: Number,
//   sexual_content_rating: Number,
//   lanaguage_rating: Number,
//   not_suitable_for_children_rating: Number
// });

module.exports = mongoose.model('story_rating', StoryRating);