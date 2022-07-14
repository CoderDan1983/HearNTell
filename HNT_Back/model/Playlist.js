//* Lists for Listener's to add stories to.

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const Playlist = new Schema({
  user_id: String,
  story_ids: [String], //* Use the arraymove function reorder the ids when story order is changed by the user
  title: String,
  description: String,
  is_queue: { //* Denotes a special queue playlist
    type: Boolean,
    default: false
  },
  is_creator_list: {
    type: Boolean,
    default: false
  }
}, 
{ 
  timestamps: true 
});

module.exports = mongoose.model('Playlist', Playlist);

//* Function to move the elements of an array around. Used to reorder the stories in a playlist.
function arraymove(arr, fromIndex, toIndex) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}