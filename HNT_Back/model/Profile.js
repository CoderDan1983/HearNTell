//* Information for the Creator Profile

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const Profile = new Schema({
  name: String,
  account_id: String,
  image_url: String,
  about_me: String,
}, 
{ 
  timestamps: true 
});

module.exports = mongoose.model('Profile', Profile); //profile, Profile