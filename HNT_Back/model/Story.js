//* Story Model

const mongoose = require('mongoose'); 
const TagFit = require('./TagFit');
const Schema = mongoose.Schema;

const Story = new Schema({
  id: String,
  account_id: String,
  audio_url: String,
  name: String,
  tag_names: [String], //* Tags are stored in their own model. This is just the tag names, which can be used for searches.
  description: String,
  duration: Number,
  private: Boolean, //Only allow subscribers to listen to this audio.
  popularity_rating: { // 
    type: Number,
    default: 0 
  }
});

//* Checks to see if given tag fits this story. If the story has a hundred tag fit responses and more than 50% say it doesn't fit
// Story.methods.checkTagFit(tag_name) = async function() {
  
//   //* Get the "tag fits" for this story.
//   const tag_fits = await TagFit.find({story_id: this.id, tag_name: tag_name});

//   //* Setup variables we will need to count tag fits
//   let tag_does_fit = 0;
//   let tag_does_not_fit = 0;

//   //* Add up the fits and doesn't fit votes.
//   tag_fits.forEach(tag_fit => {
//     if (tag_fit.fit) {
//       tag_does_fit = tag_does_fit + 1;
//   } else {
//     tag_does_not_fit = tag_does_not_fit + 1;
//   }}
//   );

//   //* If there are a hundred responses or more and less than 50% say it fits, delete the tag from the story.
//     //* But leave the tag_fits so if the creator adds that tag again, it will be deleted.
//   if ((tag_does_fit + tag_does_not_fit) >= 100) {
//     if (tag_does_not_fit > tag_does_fit) {
//       this.tag_names = arr.filter(e => e !== tag_name);
//     }
//   }

//   //* Save the new information
//   await this.save();
// }

module.exports = mongoose.model('story', Story);