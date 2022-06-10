//* Keeps track of which listener accounts can access each creator account. Essentially a join table.

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const SubscriptionRequest = new Schema({
  listener_account_id: String,
  creator_account_id: String,
  approved: Boolean
});

module.exports = mongoose.model('subscription_request', SubscriptionRequest);