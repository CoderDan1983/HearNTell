//* Records when an ad is run. For billing and analytics.

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const AdRun = new Schema({
  story_id: String,
  ad_campaign_id: String,
  price: Number,
  tag_used_id: String,
  time_ran: Date,
  account_id: String, //* If there is one. Non-logged in listeners won't have one.
}, 
{ 
  timestamps: true 
});

module.exports = mongoose.model('ad_run', AdRun);