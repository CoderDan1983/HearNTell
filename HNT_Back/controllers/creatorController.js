const Profile = require('../model/Profile');
const User = require('../model/User');
const SubscriptionRequest = require('../model/SubscriptionRequest');

// //* Create creator profile
// const createProfile = async (req, res) => {
//   const { _id: user_id } = await User.findOne({ username: req.user });
//   let request_data = req.body;
//   console.log('createController, createProfile.  req.body is: ', req.body, ", user_id is: ", user_id);
//   let profile_data = {
//     name: request_data.name,
//     user_id: user_id,
//     image_url: request_data.image_url,
//     about_me: request_data.about_me,
//   }
//   // let profile = await Profile.createProfile(profile_data);
//   //   res.json(profile);
// };

// //* Update creator profile
// const updateProfile = async (req, res) => {
//   const { _id: user_id } = await User.findOne({ username: req.user });
//   let request_data = req.body;
//   console.log('createController, updateProfile.  req.body is: ', 
//   req.body, ", user_id is: ", user_id);

//   let profile_data = {
//     name: request_data.name,
//     user_id: user_id,
//     image_url: request_data.image_url,
//     about_me: request_data.about_me,
//   }
//   let profile = await Profile.findOneAndUpdate({_id: req.body.id},profile_data);
//     res.json(profile);
// };

//* Save creator profile
const saveProfile = async (req, res) => {
  const { _id: user_id } = await User.findOne({ username: req.user });
  let request_data = req.body || {};
  console.log('saveController, saveProfile.  req.body is: ', 
  req.body, ", user_id is: ", user_id);

  let profile_data = {
    name: request_data.name || "",
    user_id: user_id,
    image_url: request_data.image_url || "",
    about_me: request_data.about_me || "",
  }

  let profile = await Profile.findOne({ user_id });
  profile && (profile = await Profile.findOneAndUpdate({ user_id }, profile_data));
  !profile && (profile = await Profile.create(profile_data));

  // profile && await Profile.findOneAndUpdate({_id: req.body.id},profile_data);
  // let profile = await Profile.findOneAndUpdate({_id: req.body.id},profile_data);
  //   res.json(profile);

  console.log('saveProfile.  returning profile as: ', profile);

  res.json(profile)
};

//* Get creator profile
//? should there be two seperate versions: one to see own, and the other to see others?
const showProfile = async (req, res) => {
  let { creator_id } = req.params;
  // console.log('showProfile.  req.params is: ', req.params);
  //* b) if a profile_id was sent over, use that.  Otherwise, view your own profile :D

  let profile =  await Profile.findOne({ user_id: creator_id }).populate("creator", "username name");

  if(!profile){
    await Profile.create({ user_id: creator_id, creator: creator_id });
    profile =  await Profile.findOne({ user_id: creator_id }).populate("creator", "username name");
  }
  // profile.creator = creator_id;
  // profile.save();

  console.log('showProfile returning: ', profile);
  res.json(profile); //* c) return profile :)
};

//* Get Subscription requests for this creator
const subscriptionRequests = async (req, res) => {
  const user_id = req.params.user_id;
  let subscription_requests = await SubscriptionRequest.find({creator_user_id: user_id});
  res.json(subscription_requests);
};

//* Get subscription requests that have been approved for this creator
const subscriptionsApproved = async (req, res) => {
  const user_id = req.params.user_id;
  let approved_subscription_requests = await SubscriptionRequest.find({creator_user_id: user_id, approved: true});
  res.json(approved_subscription_requests);
};

//* Get subscription requests that are pending for this creator
const subscriptionsPending = async (req, res) => {
  const user_id = req.params.user_id;
  let pending_subscription_requests = await SubscriptionRequest.find({creator_user_id: user_id, aproved: false});
  res.json(pending_subscription_requests);
};



module.exports = {
  saveProfile,
  // createProfile,
  // updateProfile,
  showProfile,
  subscriptionRequests,
  subscriptionsApproved,
  subscriptionsPending,
}
