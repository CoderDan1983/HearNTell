//* Records when an ad is run. For billing and analytics.

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const Campaign = new Schema({
  account_id: String,
  name: String,
  tags: [String], //* If "play on all audio is selected, a 'general' tag should be here and be bid on like the rest of the tags."
  audio_url: String,
  ad_id: String,
  max_bid: Number,
  budget: Number,
  spent_so_far: Number,
  active: Boolean,
});

module.exports = mongoose.model('campaign', Campaign);