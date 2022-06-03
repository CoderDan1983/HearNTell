//* Tag model to be used for Advertisers.

const Campaign = require('./Campaign');
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const Tag = new Schema({
  name: String,
  times_used: Number,
  highest_bid: Number,
  highest_bidder_id: String

});

//* Calculates the highest bid for this tag and sets the bid and records the bidder id in the tag.
Tag.methods.updateTagPrice = async function() {
  
  //* Find campaigns that contain the tag in their array of tags.
  const campaigns = await Campaign.find({tags: tag}); 

  //* Find highest bidding campaign and set it to one cent more than the second highest bid.
  let highest_bid = 0;
  let second_highest_bid = 0;
  let highest_bidder_id = "";

  //* Iternate through the campaigns and find the highest bidder and record their account_id.
  campaigns.forEach(campaign => {
    if (campaign.max_bid > highest_bid) {
      second_highest_bid = highest_bid;
      highest_bid = campaign.max_bid;
      highest_bidder_id = campaign.account_id;
  });

  //* Adjust highest bid to one cent above second highest bid
  highest_bid = second_highest_bid + 0.01;

  //* Save the new information
  this.highest_bid = highest_bid;
  this.highest_bidder_id = highest_bidder_id;
  await this.save();

}

module.exports = mongoose.model('tags', Tag);
