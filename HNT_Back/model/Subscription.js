//* Tracks which listeners are subscribed to which content creators

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const Subscription = new Schema({
  listener_id: String,
  listener: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  creator_id: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  playlist_id: String,
  playlist: { type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  }
}, 
{ 
  timestamps: true 
});

module.exports = mongoose.model('subscription', Subscription);