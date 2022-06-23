//* A response by a listener as to whether a certain tag fits a certain story.

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const { properlyUppercased } = require("../custom_modules/utilities");

const TagFit = new Schema({
  account_id: String,
  story_id: String,
  tag_name: String,
  fit: Boolean,
});

TagFit.pre('save', function (next) {
  this.tag_name = properlyUppercased(this.tag_name);
  next();
});



// const TagFit0 = new Schema({
//   tag_name: String,
//   fit: Boolean,
// });

// const tagFitGroup = new Schema({
//   story_id: String,
//   tags: [TagFit0],
// })

module.exports = mongoose.model('tag_fit', TagFit);