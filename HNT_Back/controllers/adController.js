const Ad = require('../model/Ad');
const User = require('../model/User');

//* Create an ad
const create = async (req, res) => {
  const request_data = req.body;
 
  let user = await User.findOne({username: req.user});

  console.log(user._id);
  let ad_data = {
    user_id: user._id,
    name: request_data.name,
    audio_url: request_data.audio_url,
    duration: request_data.duration,
    file_size: request_data.file_size
  }

  let ad = await Ad.create(ad_data);
  console.log(ad);
    res.json(ad);
};


//* Get list of all ads
const index = async (req, res) => {
  let ads = await Ad.find({});
  res.json(ads);
};

//* Get list of all ads for user
const user_ads = async (req, res) => {
  let user = await User.findOne({username: req.user});
  let ads = await Ad.find({user_id: user._id});
  console.log(ads);
  res.json(ads);
};

//* Get single ad
const show = async (req, res) => {
  const ad_id = req.params.ad_id;
  let ad = await Ad.findOne({_id: ad_id});
  console.log("In show", ad);
  res.json(ad);
};

//* Update an ad
const update = async (req, res) => {
  const ad_id = req.params.ad_id;
  const request_data = req.body;
  let ad_data = {
    name: request_data.name,
    audio_url: request_data.audio_url,
    duration: request_data.duration,
    file_size: request_data.file_size
  }
  console.log("Made it to ad update");
  let ad = await Ad.findOneAndUpdate({_id: ad_id}, ad_data);
  res.json(ad);
};

//* Remove an ad
const remove = async (req, res) => {
  const ad_id = req.params.ad_id;
  let ad = await Ad.findOneAndDelete({_id: ad_id});
  console.log(ad)
  res.json(ad);
};



module.exports = {
  create,
  index,
  show,
  update,
  remove,
  user_ads
}
