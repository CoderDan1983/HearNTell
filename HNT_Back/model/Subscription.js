//* Tracks which listeners are subscribed to which content creators

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const Subscription = new Schema({
  listener_id: String,
  creator_id: String,
});

module.exports = mongoose.model('subscription', Subscription);