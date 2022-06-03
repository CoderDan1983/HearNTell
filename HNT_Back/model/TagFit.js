//* A response by a listen as to whether a certain tag fits a certain story.

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const TagFit = new Schema({
  story_id: String,
  tag_id: String,
  tag_name: String,
  fit: Boolean,
});

module.exports = mongoose.model('tag_fit', TagFit);