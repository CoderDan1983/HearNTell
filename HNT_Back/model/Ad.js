//* Stores information about each advertisement.

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const Ad = new Schema({
  user_id: String,
  name: String,
  audio_url: String,
  duration: Number,
  file_size: Number // In kilobytes
}, 
{ 
  timestamps: true 
});



module.exports = mongoose.model('ad', Ad);