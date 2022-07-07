//* Information for the Creator Profile
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Profile = new Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  user_id: String,
  image_name: String,
  // image_file: Object,
  about_me: String,
}, 
{ 
  timestamps: true 
});

module.exports = mongoose.model('Profile', Profile); //profile, Profile