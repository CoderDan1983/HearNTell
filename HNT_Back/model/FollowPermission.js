//* Keeps track of which listener accounts can access each creator account. Essentially a join table.

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const FollowPermission = new Schema({
  listener_account_id: String,
  creator_account_id: String,
});

module.exports = mongoose.model('follow_permission', FollowPermission);