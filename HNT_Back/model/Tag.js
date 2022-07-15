//* Tag model to be used for Advertisers.

const Campaign = require('./Campaign');
const mongoose = require('mongoose'); 
const StoryRating = require('./StoryRating');
const Schema = mongoose.Schema;
const { properlyUppercased } = require("../custom_modules/utilities");


const Tag = new Schema({
  name: {
    type: String,
    unique: true,
  },
  highest_bid: Number,
  highest_bidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  number_of_stories_with_tag: Number, //* filled in with the static method of this model.
  is_blocked: {
    type: Boolean,
    default: false
  }
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

//* Gets an array of tags ready for saving or updating. Checks properly uppercased, filters blocked tags, and saves any new tags.
Tag.statics.processTagArray = async function (tag_array){

  let tags = tag_array.map((tag)=> properlyUppercased(tag));

  let filteredTags = await Promise.all(tags.map(async (tag) => { //@ b) saving tags to tags collection (?)

    //* If tag is blocked, remove it from the list and don't save it.
      let foundTag = await this.findOne( {name: tag}) || false;
      if (foundTag) {
        if (!foundTag.is_blocked) {
          return tag;
        }
      } else {
        await this.create({ name: tag });
        return tag;
      }
  }));
  console.log("filtered tags",filteredTags);
  filteredTags = filteredTags.filter(function(tag) {
    return tag !== undefined;
  })
  console.log("filtered tags",filteredTags);
  return filteredTags;
}


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
