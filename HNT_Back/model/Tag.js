//* Tag model to be used for Advertisers.

const Campaign = require('./Campaign');
const mongoose = require('mongoose'); 
const StoryRating = require('./StoryRating');
const Schema = mongoose.Schema;
const { properlyUppercased } = require("../custom_modules/utilities");

const Tag = new Schema({
  name: String,
  highest_bid: Number,
  highest_bidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  number_of_stories_with_tag: Number //* filled in with the static method of this model.
}, 
{ 
  timestamps: true 
});



// Tag.pre('findOneAndUpdate', async function() { 
// });

// Tag.pre('save', function (next) {
//   this.name = properlyUppercased(this.name);
//   console.log('Tag.js, 18, this.name is: ', this.name)
//   next();
// });

//* Gets all the tag_names from every story, then adds up how many times each tag is used and stores it in the Tag.
Tag.statics.countStoriesForEachTag = async function() {

  let tag_names_array = [];

  let stories = await Story.find({});

  stories.forEach((story, index) => {
    tag_names_array.push(story.tag_names)
  })

  //* flatten the array
  tag_names_array = tag_names_array.flat();

  let tag_name_counts = {};

  for (const element of tag_names_array) {
    if (tag_name_counts[element]) {
      tag_name_counts[element] += 1;
    } else {
      tag_name_counts[element] = 1;
    }
  }

  //* Save the updated counts to each Tag.
  const keys = Object.keys(tag_name_counts);
 
  keys.forEach((key, index) => {
    this.findOne({name: key})
    .then((tag) => {
      //* Update the story count and save.
      tag.number_of_stories_with_tag = tag_name_counts[key];
      tag.save();
    })
  });
};

//* Calculates the highest bid for this tag and sets the bid and records the bidder id in the tag.
Tag.methods.updateTagPrice = async function() {
  
  //* Find campaigns that contain the tag in their array of tags.
  const campaigns = await Campaign.find({tags: tag}); 

  //* Find highest bidding campaign and set it to one cent more than the second highest bid.
  let highest_bid = 0;
  let second_highest_bid = 0;
  let highest_bidder_id = "";

  //* Iterate through the campaigns and find the highest bidder and record their account_id.
  campaigns.forEach((campaign) => {
    if (campaign.max_bid > highest_bid) {
      second_highest_bid = highest_bid;
      highest_bid = campaign.max_bid;
      highest_bidder_id = campaign.account_id;
    }
  });

  //* Adjust highest bid to one cent above second highest bid
  highest_bid = second_highest_bid + 0.01;

  //* Save the new information
  this.highest_bid = highest_bid;
  this.highest_bidder_id = highest_bidder_id;
  await this.save();

}



module.exports = mongoose.model('Tags', Tag);
