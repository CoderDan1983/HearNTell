//* Story Model

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const Story = new Schema({
  id: String,
  account_id: String,
  audio_url: String,
  name: String,
  tag_names: [String], //* Tags are stored in their own model. This is just the tag names, which can be used for searches.
  description: String,
  private: Boolean, //Only allow subscribers to listen to this audio.
});

//* Checks to see if given tag fits this story. If the story has a hundred tag fit responses and more than 50% say it doesn't fit
Story.methods.checkTagFit(tag) = async function() {
  
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

module.exports = mongoose.model('story', Story);