//* Keeps track of which listener accounts can access each creator account. Essentially a join table.

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const SubscriptionRequest = new Schema({
  listener_id: String,
  creator_id: String,
  // playlist_id: String,
  approved: {
    type: Boolean,
    default: false
  }

}, 
{ 
  timestamps: true 
});

module.exports = mongoose.model('subscription_request', SubscriptionRequest);