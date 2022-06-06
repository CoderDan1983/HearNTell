
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const Account = new Schema({
  id: String,
  name: String,
  paid_subscription: Boolean,
  next_billing_date: Date,
  advertiser: Boolean,
  stripe_id: String,
});

module.exports = mongoose.model('account', Account);