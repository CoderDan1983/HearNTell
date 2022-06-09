//* Tracks which listeners are subscribed to which content creators

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const Subscriber = new Schema({
  listener_id: String,
  creator_id: String,
});

module.exports = mongoose.model('subscriber', Subscriber);