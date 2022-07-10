const Profile = require('../model/Profile');
const User = require('../model/User');
const SubscriptionRequest = require('../model/SubscriptionRequest');
const fsp = require("fs").promises; //* for storing files asynchronously :D

//^ Helper Functions :)
function keepItSortish(obj){ //* ps:  This one fails preventing long runs of binary :/
  for(prop in obj){
    const value = obj[prop];
    const tooLong = (value.length && (value.length > 100)) ? true : false;
    console.log(prop, tooLong ? "too long!" : value);
  }
}

async function writeFileAsynchronously(filename, data) {
  try{
    console.log('file saved to ', filename);
    await fsp.writeFile(filename, data);
  } catch (e) {
    console.log('error is: ', e);
  }
}

async function deleteFileAsynchronously(filename){
  await fsp.unlink(filename, function (err) {
      if (err) throw err;
      // if no error, file has been deleted successfully
      console.log(filename + ' deleted!');
  });  
}

// fs.unlink('sample.txt', function (err) {
//     if (err) throw err;
//     // if no error, file has been deleted successfully
//     console.log('File deleted!');
// });
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


function profileLogger(preString, profile, special){
  // for(prop in profile){
  //   const value = profile[prop];
  //   if(special.includes(prop)&&(value)){
  //     console.log('for ' + prop + ": ")
  //     // keepItSortish(value)
  //   }
  //   else{
  //     console.log(`${prop}: `, value);
  //   }
  // }
  if(profile){ 
    const { creator, user_id, about_me, image_file } = profile;
    console.log(preString, 'creator is: ', creator, ', user_id is: ', user_id, ', about_me is: ', about_me);
    if(image_file) {
      console.log('image_file.data is of type ', typeof(image_file.data), image_file.data.length)
      const { name: fileName, size} = image_file; //other values: encoding, tempFilePath, truncated, mimetype, md5,
      image_file && console.log('fileName is: ', fileName, ', fileSize is: ', size);
    }
  }
  else{
    console.log('profile was ', profile, ' of type ', typeof(profile));
  }
}

//* Save creator profile
const saveProfile = async (req, res) => {
  const { _id: user_id } = await User.findOne({ username: req.user });

  const truncated = req.files?.file?.truncated;
  const name = req.body.name || "";
  const about_me = req.body.about_me || "";
  const image_file = (!truncated && req.files?.image_file) || undefined;
  // const image_data = (image_file && image_file.data && image_file.data) || undefined;
  const image_name =  image_file ? user_id + "_" + image_file.name : undefined;
  const profile_data = { creator: user_id, user_id, image_name,  about_me } //image_file
  
  const user_data = { name }

  // console.log('saveController, saveProfile.  req.body is: ', 
  // req.body, ", user_id is: ", user_id, ', req.files is: ', req.files, ', truncated is: ', truncated);

  console.log('line 89. we are in saveProfile!')

  await User.findOneAndUpdate({ _id: user_id }, user_data); //* this only updates if the user exists!
  const { image_name: old_image_name } = await Profile.findOne({ user_id }) || {};
  console.log('old_image_name is: ', old_image_name);

  const uploadPath =  "public/images/"  + image_name;
  const path_to_old = "public/images/" + old_image_name;
  image_file && old_image_name && await deleteFileAsynchronously(path_to_old);
  image_file && await writeFileAsynchronously(uploadPath, image_file.data);

  let profile = await Profile.findOneAndUpdate({ user_id }, profile_data, { upsert: true }).populate("creator", "username name");
  
  !profile && (profile = await Profile.findOne({ user_id })).populate("creator", "username name");

  // console.log("saveProfile.  returning profile has: ", profile);
  res.json(profile); //* although profile has updated, this may return the non-updated version

  // res.json({ testing: 'save functionality!' })
};

//* Get creator profile

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
  profileLogger('showProfile returning: ', profile, ["image_file"])
  res.json(profile); //* c) return profile :)
};

//? Are these three functions in the right place (?)
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
  let pending_subscription_requests = await SubscriptionRequest.find({creator_user_id: user_id, approved: false});
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
