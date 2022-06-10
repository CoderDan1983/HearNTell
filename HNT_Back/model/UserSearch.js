//* Save common searches by user.

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const UserSearch = new Schema({
  user_id: String,
  search_string: String
});

module.exports = mongoose.model('user_search', UserSearch);